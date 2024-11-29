const express = require("express");
const multer = require("multer");
var path = require("path");
const router = express.Router();
const {
    loginEmployer,
    loginFreelancer,
    registerEmployer,
    registerFreelancer,
    updateEmployer,
    applyFreelancerWork,
    updateFreelancer,
    logout,
    deleteFreelancerWork,
    getFreelancerWorks,
    hireFreelancer,
    deleteFreelancerAccount,
    deleteEmployerAccount,
    getFreelancer,
    getEmployer,
} = require("../controllers/mainControllers");

const {
    authenticateEmployer,
    authenticateFreelancer,
} = require("../middleware/mainMiddleware");

var employerUploads = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/employer");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

var freelancerUploads = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/freelancer");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

var employerUploads = multer({ storage: employerUploads });
var freelancerUploads = multer({ storage: freelancerUploads });

router.post("/freelancer/login", loginFreelancer);
router.post(
    "/freelancer/register",
    freelancerUploads.single("f_pfp"),
    registerFreelancer
);
router.post(
    "/freelancer/update",
    employerUploads.single("f_pfp"),
    authenticateFreelancer,
    updateFreelancer
);
router.post(
    "/freelancer/applyWork",
    authenticateFreelancer,
    applyFreelancerWork
);
router.delete(
    "/freelancer/deleteWork",
    authenticateFreelancer,
    deleteFreelancerWork
);
router.delete(
    "/freelancer/deleteAccount",
    authenticateFreelancer,
    deleteFreelancerAccount
);
router.get("/freelancer/works", getFreelancerWorks);

router.post("/employer/login", loginEmployer);
router.post(
    "/employer/register",
    employerUploads.single("emp_pfp"),
    registerEmployer
);
router.post(
    "/employer/update",
    employerUploads.single("emp_pfp"),
    authenticateEmployer,
    updateEmployer
);
router.post("/employer/hire", authenticateEmployer, hireFreelancer);
router.delete(
    "/employer/deleteAccount",
    authenticateEmployer,
    deleteEmployerAccount
);

router.post("/logout", logout);

router.get('/freelancer', getFreelancer)
router.get('/employer', getEmployer)

module.exports = router;
