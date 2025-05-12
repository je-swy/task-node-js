import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", async (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.data = users;
  } catch (error) {
    res.err = error;
  }
  next();
}, responseMiddleware);

// get by id
router.get("/:id", async (req, res, next) => {
  try {
    const user = userService.getUserById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.data = user;
  } catch (error) {
    res.err = error;
  }
  next();
}, responseMiddleware);

// create new user
router.post("/", createUserValid, async (req, res, next) => {
  try {
    const newUser = userService.createUser(req.body);
    res.data = newUser;
  } catch (error) {
    res.err = error;
  }
  next();
}, responseMiddleware);

// update user
router.patch("/:id", updateUserValid, async (req, res, next) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      throw new Error("User not found");
    }
    res.data = updatedUser;
  } catch (error) {
    res.err = error;
  }
  next();
}, responseMiddleware);

// delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = userService.deleteUser(req.params.id);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    res.data = deletedUser;
  } catch (error) {
    res.err = error;
  }
  next();
}, responseMiddleware);

export { router };
