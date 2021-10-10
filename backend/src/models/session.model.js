import mongoose from "mongoose"
import validator from "validator"

const sessionSchema = mongoose.Schema(
  {
    expiration: {
      type: Date,
      require: true,
      trim: true,
    },
    user_session: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model('Session', sessionSchema)