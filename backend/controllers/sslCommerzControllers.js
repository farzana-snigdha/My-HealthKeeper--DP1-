const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const shortid = require("shortid");
const PaymentModel = require("../models/Payment.models");
require("dotenv").config();

setInterval(() => {
  // console.log('ss')
  // let user = req.headers['userid'];
  PaymentModel.find({}, (err, ans) => {
    if (err) {
      console.log("PaymentModel notification: ", err);
    }
    if (ans) {
      //for loop reminder.size,
      for (i = 0; i < ans.length; i++) {
        if (ans[i].paymentDone) {
          let paymentDate = ans[i].paymentDate;
          let curDate = new Date();
          let timeDiff = curDate.getTime() - paymentDate.getTime();
          let daysDiff = timeDiff / (1000 * 24 * 3600);
          if (daysDiff > 30) {
            PaymentModel.findByIdAndUpdate(
              ans[i]._id,
              { paymentDone: false },
              (err, remind) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      }
    }
  });
}, 60000);

// For live payment set first parameter `false` and for sandbox set it `true`
const payment = new PaymentSession(
  true,
  process.env.STORE_ID,
  process.env.STORE_PASSWORD
);
let sessionkey=null
exports.SSLCommerz_payment_init = async (req, res) => {
  const transactionId = `transaction_${shortid.generate()}`;
  let user = req.headers["userid"];
  console.log('req.headers["userid"]; ', user);
  let phone = req.headers["phone"];
  console.log('req.headers["userphone"]; ', phone);
  let name=req.headers['userName']

  try {
    // Set the urls
    payment.setUrls({
      // success: "yoursite.com/success", // If payment Succeed
      success: `http://127.0.0.1:5000/payment/success?transactionId=${transactionId}`, // If payment Succeed
      fail: `http://127.0.0.1:5000/payment/fail`, // If payment failed
      cancel: `http://127.0.0.1:5000/payment/cancel`, // If user cancel payment
      ipn: `http://127.0.0.1:5000/ipn`, // SSLCommerz will send http post request in this link
    });
    // Set order details
    payment.setOrderInfo({
      total_amount: 100, // Number field
      currency: "BDT", // Must be three character string
      tran_id: transactionId, // Unique Transaction id
      emi_option: 0, // 1 or 0
      multi_card_name: "internetbank", // Do not Use! If you do not customize the gateway list,
      allowed_bin: "371598,371599,376947,376948,376949", // Do not Use! If you do not control on transaction
      emi_max_inst_option: 3, // Max instalment Option
      emi_allow_only: 0, // Value is 1/0, if value is 1 then only EMI transaction is possible
    });

    // Set customer info

    payment.setCusInfo({
      name: "cusName",
      email: "cusEmail@gmail.com",
      add1: "cusAdd1",
      add2: "cusAdd2",
      city: "cusCity",
      state: "cusState",
      postcode: 4000,
      country: "Bangladesh",
      phone: phone,
      fax: "cusFax",
    });

    // Set shipping info

    payment.setShippingInfo({
      method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
      num_item: 2,
      name: "name",
      add1: "shippingAdd1",
      add2: "shippingAdd2",
      city: "shippingCity",
      state: "shippingState",
      postcode: 4000,
      country: "Bangladesh",
    });

    // Set Product Profile
    payment.setProductInfo({
      product_name: "Computer",
      product_category: "Electronics",
      product_profile: "general",
    });

    // Initiate Payment and Get session key
    payment.paymentInit().then(async (response) => {
       sessionkey=response['sessionkey']
      console.log("paymentInit", sessionkey);
      res.send(response["GatewayPageURL"]);
      // paymentDone = response["status"] === "SUCCESS";
      console.log("user ", user);

      const existingUser = await PaymentModel.findOne({ user });
      // console.log('existingUser ',existingUser)
      if (existingUser) {
        await PaymentModel.findOneAndUpdate(
          { user },
          {
            transactionId: transactionId,
          }
        ).then((res2) => {
          // console.log("res2 ", res2);
        });
      } else {
        // console.log("res11 ", res1);
        const SMSPayment = new PaymentModel({
          user,
          phone,
          total_amount: 100,
          transactionId,
          // paymentDone,
        });
        await SMSPayment.save().then((responsess) => {
          console.log(responsess);
        });
      }
    });
  } catch (err) {
    console.log("SMSPayment  ", err);
    return res.status(400).json({ error });
  }
};

exports.SSLCommerz_payment_success = async (req, res) => {
  console.log("SSLCommerz_payment_success", sessionkey);

  const { transactionId } = req.query;
  await PaymentModel.findOne({ transactionId }).then((ans) => {
    console.log("dcacxac ", transactionId);
  });
  if (!transactionId) {
    return res.json({ message: "transactionId must be required" });
  } else {
    // await SSLCommerz.validate(sessionkey).then((res3)=>{
    //   console.log(res3)
    // }).catch((err)=>{
    //   console.log('res3 ',err)
    // })
    const currentPayment = PaymentModel.findOneAndUpdate(
      { transactionId: transactionId },
      {
        paymentDone: true,
        paymentDate: Date.now(),
      }
    );

    currentPayment.exec((err, result) => {
      if (err) console.log(err);
      res.redirect(`${process.env.CLIENT_URL}/profile`);
    });
  }
};

exports.SSLCommerz_payment_fail = (req, res) => {
  res.redirect(process.env.CLIENT_URL);
};

exports.SSLCommerz_payment_cancel = (req, res) => {
  res.redirect(process.env.CLIENT_URL);
};

// -------------------------------- After Success

// console.log(response['sessionkey']);
//     D37CD2C0A0D322991531D217E194F981

// console.log(response['GatewayPageURL']);
//     https://sandbox.sslcommerz.com/EasyCheckOut/testcded37cd2c0a0d322991531d217e194f981

// -------------------------------- After Failure (Wrong Store ID)

// console.log(response['status']);
//     FAILED

// console.log(response['failedreason']);
//     Store Credential Error Or Store is De-active
