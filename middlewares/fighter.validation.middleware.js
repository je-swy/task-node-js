import { FIGHTER } from "../models/fighter.js";

const isNumberInRange = (val, min, max) => typeof val === "number" && val >= min && val <= max;

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const fighter = req.body;

  const allowedKeys = Object.keys(FIGHTER);
  const requiredKeys = allowedKeys.filter((key) => key !== "id" && key !== "health");
  const fighterKeys = Object.keys(fighter);

  // extra fields
  const extraKeys = fighterKeys.filter((k) => !allowedKeys.includes(k));
  if (extraKeys.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Unexpected fields: ${extraKeys.join(", ")}`
    });
  }

  // missing fields
  for (const key of requiredKeys) {
    if (!fighter[key] && fighter[key] !== 0) {
      return res.status(400).json({
        error: true,
        message: `Missing required field: ${key}`
      });
    }
  }

  // checking
  if (typeof fighter.name !== "string" || fighter.name.trim() === "") {
    return res.status(400).json({
      error: true,
      message: "Name must be a non-empty string"
    });
  }

  if (!isNumberInRange(fighter.power, 1, 100)) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100"
    });
  }

  if (!isNumberInRange(fighter.defense, 1, 10)) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10"
    });
  }

  if ("health" in fighter && !isNumberInRange(fighter.health, 80, 120)) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120"
    });
  }


  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  
  const fighter = req.body;

  const allowedKeys = Object.keys(FIGHTER).filter((key) => key !== "id");
  const fighterKeys = Object.keys(fighter);
  const extraKeys = fighterKeys.filter((k) => !allowedKeys.includes(k));
  const validKeys = fighterKeys.filter((k) => allowedKeys.includes(k));

  // id is not changeable
  if ("id" in fighter) {
    return res.status(400).json({
      error: true,
      message: "ID must not be updated"
    });
  }

  // extrs fields
  if (extraKeys.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Unexpected fields: ${extraKeys.join(", ")}`
    });
  }

  // at least one valid field
  if (validKeys.length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided for update"
    });
  }

  // format check
  if (fighter.name && (typeof fighter.name !== "string" || fighter.name.trim() === "")) {
    return res.status(400).json({
      error: true,
      message: "Name must be a non-empty string"
    });
  }

  if ("power" in fighter && !isNumberInRange(fighter.power, 1, 100)) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100"
    });
  }

  if ("defense" in fighter && !isNumberInRange(fighter.defense, 1, 10)) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10"
    });
  }

  if ("health" in fighter && !isNumberInRange(fighter.health, 80, 120)) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120"
    });
  }
  
  next();
};

export { createFighterValid, updateFighterValid };
