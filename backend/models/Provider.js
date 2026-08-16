import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  businessName: { type: String, required: true },
  cookName: { type: String, required: true },
  cuisineTypes: [{ type: String }],
  mealTypes: [{ type: String }], // 'veg', 'non-veg', 'jain'
  description: { type: String, default: '' },
  city: { type: String, required: true, index: true },
  area: { type: String, required: true },
  deliveryAreas: [{ type: String }],
  rating: { type: Number, default: 4.8 },
  ratingCount: { type: Number, default: 120 },
  hygieneRating: { type: String, default: '5-Star Verified' },
  fssaiNumber: { type: String, default: 'FSSAI-12489201948291' },
  kitchenPhoto: { type: String, default: '' },
  cookPhoto: { type: String, default: '' },
  pricePerMeal: { type: Number, default: 99 },
  monthlyPlanPrice: { type: Number, default: 2499 },
  weeklyPlanPrice: { type: Number, default: 699 },
  deliverySlots: [{ type: String }],
  isAcceptingOrders: { type: Boolean, default: true },
  verificationStatus: { type: String, enum: ['VERIFIED', 'PENDING', 'REJECTED'], default: 'VERIFIED' },
  earnings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'providers'
});

export const Provider = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
export default Provider;
