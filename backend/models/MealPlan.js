import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  providerId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  planType: { type: String, enum: ['DAILY', 'WEEKLY', 'MONTHLY'], default: 'MONTHLY' },
  durationDays: { type: Number, default: 30 },
  totalMeals: { type: Number, default: 30 },
  price: { type: Number, required: true },
  pricePerMeal: { type: Number, required: true },
  discountPercent: { type: Number, default: 20 },
  features: [{ type: String }],
  mealSlot: { type: String, default: 'Lunch & Dinner' },
  dietPreference: { type: String, default: 'Vegetarian' },
  pauseAllowedDays: { type: Number, default: 5 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  collection: 'meal_plans'
});

export const MealPlan = mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema);
export default MealPlan;
