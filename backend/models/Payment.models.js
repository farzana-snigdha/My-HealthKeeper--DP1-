const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SMSPayment = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    transactionId: {
      type: String,
      required: true,
    },
    paymentDone: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    total_amount:{
        type:Number,
    },
    paymentDate:{
      type:Date,
    },
    deliveryMethod: {
      type: String,
      default: "",
    },
    // customerInfo: {
    //   type: Object,
    //   default: {
    //     cusName: "",
    //     cusEmail: "",
    //     cusAdd1: "",
    //     cusAdd2: "",
    //     cusCity: "",
    //     cusState: "",
    //     cusPostcode: "",
    //     cusCountry: "Bangladesh",
    //     cusPhone: "",
    //     cusFax: "",
    //   },
    // },
    // shippingInfo: {
    //   type: Object,
    //   default: {
    //     name: "",
    //     shippingAdd1: "",
    //     shippingAdd2: "",
    //     shippingCity: "",
    //     shippingState: "",
    //     shippingPostcode: "",
    //     shippingCountry: "Bangladesh",
    //     cusPhone: "",
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("smspayment", SMSPayment);
