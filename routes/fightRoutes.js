import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// GET /api/fights all fights
router.get("/", (req, res, next) => {
  try {
    res.data = fightService.getAllFights();
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// GET /api/fights/:id current
router.get("/:id", (req, res, next) => {
  try {
    const fight = fightService.getFightById(req.params.id);
    if (!fight) {
      res.err = { status: 404, message: "Fight not found" };
    } else {
      res.data = fight;
    }
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

// POST /api/fights start fight
router.post("/", (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;

    if (!fighter1 || !fighter2) {
      throw new Error("fighter1 and fighter2 IDs are required");
    }

    const result = fightService.createFight({ fighter1, fighter2 });
    res.data = result;
  } catch (err) {
    res.err = err;
  }
  next();
}, responseMiddleware);

export { router };
