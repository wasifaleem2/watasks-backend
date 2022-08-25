const router = require("express").Router();
const controller = require("../controller/controller");
const userController = require("../controller/userController");
const adminController = require("../controller/adminController");

const multer = require("multer");
const store = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../mukhar/src/media/profiles");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const profiler = multer({ storage: store });

router.post("/register", profiler.single("profile"), userController.registerUser);
router.post("/login", profiler.single("profile"), userController.loginUser);
// router.delete("/delete", auth, controller.delete);
router.post(`/addtask`, profiler.single("profile"), controller.AddTask);
router.get(`/getpendingtasks/:userEmail`, controller.FetchPendingTasks);
router.get(`/getcompletedtasks/:userEmail`, controller.FetchCompletedTasks);
router.put("/update/:id", controller.UpdateTask);
router.put("/completed/:id", controller.TaskComplete);
router.delete("/deletetask/:id", controller.DeleteTask);

//admin routes
router.get(`/admin/123/allusers`, adminController.AllUsers);
router.get(`/admin/123/alltasks`, adminController.AllTasks);
router.delete("/admin/123/deleteuser/:id", adminController.DeleteByAdmin);



module.exports = router;
