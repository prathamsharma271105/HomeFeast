import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data_store.json');

const NAMES_TO_DELETE = ['manisha', 'raju', 'pratham', 'rakesh'];

const isTarget = (str) => {
  if (!str || typeof str !== 'string') return false;
  const lower = str.toLowerCase();
  return NAMES_TO_DELETE.some(name => lower.includes(name));
};

if (fs.existsSync(DB_FILE)) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));

  // Collect IDs of users to delete
  const targetUserIds = new Set();
  if (Array.isArray(data.users)) {
    data.users = data.users.filter(u => {
      const match = isTarget(u.name) || isTarget(u.email) || isTarget(u.id);
      if (match) targetUserIds.add(u.id);
      return !match;
    });
  }

  // Filter providers
  const targetProviderIds = new Set();
  if (Array.isArray(data.providers)) {
    data.providers = data.providers.filter(p => {
      const match = targetUserIds.has(p.userId) || isTarget(p.ownerName) || isTarget(p.email) || isTarget(p.businessName) || isTarget(p.id);
      if (match) targetProviderIds.add(p.id);
      return !match;
    });
  }

  // Filter riders
  if (Array.isArray(data.riders)) {
    data.riders = data.riders.filter(r => {
      return !(targetUserIds.has(r.userId) || isTarget(r.name) || isTarget(r.email) || isTarget(r.id));
    });
  }

  // Filter orders
  if (Array.isArray(data.orders)) {
    data.orders = data.orders.filter(o => {
      return !(targetUserIds.has(o.customerId) || isTarget(o.customerName) || targetProviderIds.has(o.providerId));
    });
  }

  // Filter subscriptions
  if (Array.isArray(data.subscriptions)) {
    data.subscriptions = data.subscriptions.filter(s => {
      return !(targetUserIds.has(s.userId) || isTarget(s.customerName) || targetProviderIds.has(s.providerId));
    });
  }

  // Filter reviews
  if (Array.isArray(data.reviews)) {
    data.reviews = data.reviews.filter(r => {
      return !(targetUserIds.has(r.customerId) || isTarget(r.customerName) || targetProviderIds.has(r.providerId));
    });
  }

  // Filter complaints
  if (Array.isArray(data.complaints)) {
    data.complaints = data.complaints.filter(c => {
      return !(targetUserIds.has(c.userId) || isTarget(c.customerName) || isTarget(c.comment));
    });
  }

  // Filter notifications
  if (Array.isArray(data.notifications)) {
    data.notifications = data.notifications.filter(n => {
      return !(targetUserIds.has(n.userId) || isTarget(n.message) || isTarget(n.title));
    });
  }

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ Successfully removed all data for manisha, raju, pratham, and rakesh from backend data_store.json');
} else {
  console.log('No data_store.json found to clean.');
}
