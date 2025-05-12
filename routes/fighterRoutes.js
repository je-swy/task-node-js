import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// GET /api/fighters
router.get("/", (req, res, next) => {
  try {
    const fighters = fighterService.getAllFighters();
    res.data = fighters;
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// GET /api/fighters/:id
router.get("/:id", (req, res, next) => {
  try {
    const fighter = fighterService.getFighterById(req.params.id);
    if (!fighter) {
      res.err = { status: 404, message: "Fighter not found" };
    } else {
      res.data = fighter;
    }
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// POST /api/fighters
router.post("/", createFighterValid, (req, res, next) => {
  try {
    const newFighter = fighterService.createFighter(req.body);
    res.data = newFighter;
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// PATCH /api/fighters/:id
router.patch("/:id", updateFighterValid, (req, res, next) => {
  try {
    const updated = fighterService.updateFighter(req.params.id, req.body);
    if (!updated) {
      res.err = { status: 404, message: "Fighter not found" };
    } else {
      res.data = updated;
    }
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// DELETE /api/fighters/:id
router.delete("/:id", (req, res, next) => {
  try {
    const deleted = fighterService.deleteFighter(req.params.id);
    if (!deleted) {
      res.err = { status: 404, message: "Fighter not found" };
    } else {
      res.data = deleted;
    }
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

export { router };
