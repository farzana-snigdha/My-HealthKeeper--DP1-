const express = require("express");
const router = express.Router();
const {
    SSLCommerz_payment_init,
    SSLCommerz_payment_success,
    SSLCommerz_payment_fail,
    SSLCommerz_payment_cancel,
} = require("../controllers/sslCommerzControllers");

router.post("/", SSLCommerz_payment_init);
router.post("/success", SSLCommerz_payment_success);
router.post("/fail", SSLCommerz_payment_fail);
router.post("/cancel", SSLCommerz_payment_cancel);

module.exports = router;
