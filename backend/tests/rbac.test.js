import http from 'http';
import app from '../server.js';

const PORT = 55667;
let server;

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const headers = {
      'Content-Type': 'application/json'
    };
    if (payload) {
      headers['Content-Length'] = Buffer.byteLength(payload);
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: `/api${path}`,
        method,
        headers
      },
      (res) => {
        let rawData = '';
        res.on('data', chunk => { rawData += chunk; });
        res.on('end', () => {
          let data = null;
          try {
            data = JSON.parse(rawData);
          } catch (e) {
            data = rawData;
          }
          resolve({ status: res.statusCode, body: data });
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runRBACTests() {
  console.log('🛡️ Starting HomeFeast Role-Based Access Control (RBAC) Test Suite...\n');
  let passed = 0;
  let failed = 0;

  const assert = (condition, name) => {
    if (condition) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.error(`❌ ${name}`);
      failed++;
    }
  };

  server = app.listen(PORT);
  await new Promise(r => setTimeout(r, 600));

  try {
    const timestamp = Date.now();
    const customerEmail = `cust_${timestamp}@test.com`;
    const cookEmail = `cook_${timestamp}@test.com`;
    const riderEmail = `rider_${timestamp}@test.com`;

    // 1. Security Check: Public registration as ADMIN must be rejected
    const adminRegRes = await request('POST', '/auth/register', {
      name: 'Fake Admin',
      email: `fakeadmin_${timestamp}@test.com`,
      phone: '+91 99999 11111',
      password: 'password123',
      role: 'ADMIN'
    });
    assert(adminRegRes.status === 400 && adminRegRes.body.success === false, 'Security: Public registration with role: ADMIN is strictly blocked (400 Bad Request)');

    // 2. Register legitimate test accounts
    const custReg = await request('POST', '/auth/register', {
      name: 'Test Customer',
      email: customerEmail,
      phone: `+91 98290 ${Math.floor(10000 + Math.random() * 90000)}`,
      password: 'password123',
      role: 'CUSTOMER'
    });
    assert(custReg.status === 201 && custReg.body.data.role === 'CUSTOMER', 'Customer Registration creates persistent role: CUSTOMER');
    const customerToken = custReg.body.token;

    const cookReg = await request('POST', '/auth/register', {
      name: 'Test Home Cook',
      email: cookEmail,
      phone: `+91 98290 ${Math.floor(10000 + Math.random() * 90000)}`,
      password: 'password123',
      role: 'PROVIDER',
      businessName: 'Test Rasoi'
    });
    assert(cookReg.status === 201 && cookReg.body.data.role === 'PROVIDER', 'Cook Registration creates persistent role: PROVIDER');
    const cookToken = cookReg.body.token;

    const riderReg = await request('POST', '/auth/register', {
      name: 'Test Express Rider',
      email: riderEmail,
      phone: `+91 98290 ${Math.floor(10000 + Math.random() * 90000)}`,
      password: 'password123',
      role: 'RIDER',
      vehicleType: 'EV Scooter'
    });
    assert(riderReg.status === 201 && riderReg.body.data.role === 'RIDER', 'Rider Registration creates persistent role: RIDER');
    const riderToken = riderReg.body.token;

    // 3. Login as Admin
    const adminLogin = await request('POST', '/auth/login', {
      email: 'admin@homefeast.test',
      password: 'password123'
    });
    assert(adminLogin.status === 200 && adminLogin.body.data.role === 'ADMIN', 'Admin Login succeeds with verified role: ADMIN');
    const adminToken = adminLogin.body.token;

    // 4. Role Immutability on Login: Category selected does NOT change stored role
    const riderLoginAsCook = await request('POST', '/auth/login', {
      email: riderEmail,
      password: 'password123',
      role: 'PROVIDER' // Attempting to switch role to Provider during login
    });
    assert(riderLoginAsCook.status === 200 && riderLoginAsCook.body.data.role === 'RIDER', 'Login Immutability: Rider selecting Cook on login still gets verified role: RIDER');

    const customerLoginAsAdmin = await request('POST', '/auth/login', {
      email: customerEmail,
      password: 'password123',
      role: 'ADMIN' // Attempting to switch role to Admin during login
    });
    assert(customerLoginAsAdmin.status === 200 && customerLoginAsAdmin.body.data.role === 'CUSTOMER', 'Login Immutability: Customer selecting Admin on login still gets verified role: CUSTOMER');

    // 5. Customer RBAC Enforcement
    const custAdminAttempt = await request('GET', '/admin/dashboard', null, customerToken);
    assert(custAdminAttempt.status === 403, 'Customer RBAC: Calling Admin Dashboard -> 403 Forbidden');

    const custCookAttempt = await request('GET', '/providers/dashboard', null, customerToken);
    assert(custCookAttempt.status === 403, 'Customer RBAC: Calling Cook Dashboard -> 403 Forbidden');

    const custRiderAttempt = await request('GET', '/riders/overview', null, customerToken);
    assert(custRiderAttempt.status === 403, 'Customer RBAC: Calling Rider Dashboard -> 403 Forbidden');

    // 6. Cook RBAC Enforcement
    const cookDashboard = await request('GET', '/providers/dashboard', null, cookToken);
    assert(cookDashboard.status === 200 && cookDashboard.body.success === true, 'Cook RBAC: Calling Cook Dashboard -> 200 OK');

    const cookAdminAttempt = await request('GET', '/admin/dashboard', null, cookToken);
    assert(cookAdminAttempt.status === 403, 'Cook RBAC: Calling Admin Dashboard -> 403 Forbidden');

    const cookRiderAttempt = await request('GET', '/riders/overview', null, cookToken);
    assert(cookRiderAttempt.status === 403, 'Cook RBAC: Calling Rider Dashboard -> 403 Forbidden');

    // 7. Rider RBAC Enforcement
    const riderOverview = await request('GET', '/riders/overview', null, riderToken);
    assert(riderOverview.status === 200 && riderOverview.body.success === true, 'Rider RBAC: Calling Rider Overview -> 200 OK');

    const riderAdminAttempt = await request('GET', '/admin/dashboard', null, riderToken);
    assert(riderAdminAttempt.status === 403, 'Rider RBAC: Calling Admin Dashboard -> 403 Forbidden');

    const riderCookAttempt = await request('GET', '/providers/dashboard', null, riderToken);
    assert(riderCookAttempt.status === 403, 'Rider RBAC: Calling Cook Dashboard -> 403 Forbidden');

    // 8. Admin Oversight
    const adminDashboard = await request('GET', '/admin/dashboard', null, adminToken);
    assert(adminDashboard.status === 200 && adminDashboard.body.success === true, 'Admin RBAC: Calling Admin Dashboard -> 200 OK');

    const adminCookAccess = await request('GET', '/providers/dashboard', null, adminToken);
    assert(adminCookAccess.status === 200 && adminCookAccess.body.success === true, 'Admin RBAC: Calling Cook Dashboard with Admin token -> 200 OK');

    const adminRiderAccess = await request('GET', '/riders/overview', null, adminToken);
    assert(adminRiderAccess.status === 200 && adminRiderAccess.body.success === true, 'Admin RBAC: Calling Rider Dashboard with Admin token -> 200 OK');

    console.log('\n========================================');
    console.log(`RBAC Test Results: ${passed} Passed, ${failed} Failed`);
    console.log('========================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    if (server) server.close();
  }
}

runRBACTests();
