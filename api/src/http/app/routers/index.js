const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/auth");

const LoginController = require("../controllers/login.controller");
const UserController = require("../controllers/user.controller");
const TaskController = require("../controllers/task.controller");
const upload = require("../middlewares/users-uploads");

router.get("/", (req, res) => {
    console.log(req.method, req.path, req.baseUrl);
  res.status(200).json("Hello World");
});

router.get("/login", LoginController.getAll);
router.post("/login", LoginController.signIn);
router.post("/session", AuthMiddleware.authToken, LoginController.validateUser);
router.post("/logout", AuthMiddleware.authToken, LoginController.signOut);

/* User Routers */
router.get("/users", UserController.getAll);
router.get("/users/:id", AuthMiddleware.authToken, UserController.getUserById);
router.post("/users",  upload.single("avatar_url"), UserController.createUser);
router.delete("/users/:id", UserController.deleteUser);
router.put("/users/:id", UserController.updateUser);

/* Tasks Roouters */
router.get("/tasks", AuthMiddleware.authToken, TaskController.getAll);
router.get("/tasks/:id", AuthMiddleware.authToken, TaskController.getTaskById);
router.post("/tasks", AuthMiddleware.authToken, TaskController.createTask);
router.delete("/tasks/:id", AuthMiddleware.authToken, TaskController.deleteTask);
router.put("/tasks", AuthMiddleware.authToken, TaskController.updateTask);

router.get("/upload", upload.single("avatar_url"), (request, response)=> {
  return response.status(200).json({
    message: "Arquivo enviado com sucesso!",
    data: request.file.filename
  })
})

module.exports = {
  router
}