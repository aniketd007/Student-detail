var express = require('express');
var router = express.Router();
const userController = require('../controllers/User')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

/*Login Page*/
router.post('/login', userController.Login);

/*Signup page. */
router.post('/signup', userController.signUp);

/*Personal Insert page. */
router.post('/insert', upload.single('image'), userController.insert);

/*Personal View page. */
router.post('/view', userController.singleView);

router.post('/views', userController.allView);

module.exports = router;
