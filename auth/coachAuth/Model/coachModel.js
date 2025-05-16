import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  cv: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
 phoneNumber: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^\+201[0125][0-9]{8}$/.test(v);
    },
    message: props => `${props.value} is not a valid Egyptian phone number!`
  }
}

}, { timestamps: true });

// Instance method
coachSchema.methods.generateWhatsappLink = function(message = "") {
  const cleanedNumber = this.phoneNumber.replace(/\D/g, '');
  let url = `https://wa.me/${cleanedNumber}`;
  if (message) url += `?text=${encodeURIComponent(message)}`;
  return url;
};

export default mongoose.model('Coach', coachSchema);