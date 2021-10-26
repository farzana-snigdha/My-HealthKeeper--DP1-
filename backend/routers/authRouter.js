const router = require("express").Router();

const userCtrl = require("../controllers/user.controllers/authControllers");
const passwordChangeControllers=require('../controllers/user.controllers/passwordChange.controllers')
const profileCtrl=require('../controllers/user.controllers/profile.controllers')
const auth=require("../middleware/auth")
const { upload } = require("../utilities/filehelper");

router.post("/signup", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);
router.post("/login",userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.get('/logout', userCtrl.logout)
router.post('/google_login', userCtrl.googleLogin)

router.post('/forgot', passwordChangeControllers.forgotPassword)
router.post('/reset', auth, passwordChangeControllers.resetPassword)

router.get('/infor', auth, profileCtrl.getUserInfor)
router.patch('/update', auth, profileCtrl.updateUser)
router.post('/set_profile_image',auth,upload.single("file"),profileCtrl.setProfilePicture)
router.get('/get_profile_image',auth,profileCtrl.getProfileImage)
router.get('/user_payment_status',auth,profileCtrl.getUserPasymentStatus)



module.exports = router;
