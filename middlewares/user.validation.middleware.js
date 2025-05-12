import { USER } from "../models/user.js";

const isGmail = (email) => typeof email === "string" && email.endsWith("@gmail.com");
const isPhone = (phone) => /^\+380\d{9}$/.test(phone);
const isValidPassword = (password) => typeof password === "string" && password.length >= 3;


const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const user = req.body;

  const allowedKeys = Object.keys(USER);
  const requiredKeys = allowedKeys.filter((key) => key !== "id");

  const userKeys = Object.keys(user);

  const extraKeys = userKeys.filter(k => !allowedKeys.includes(k));
  if (extraKeys.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Unexpected fields: ${extraKeys.join(", ")}`
    });
  }

  // required fields
  for (const key of requiredKeys) {
    if (!user[key]) {
      return res.status(400).json({
        error: true,
        message: `Missing required field: ${key}`
      });
    }
  }

  // format

  if (!isGmail(user.email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be a gmail address"
    });
  }
  if (!isPhone(user.phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: "Phone must match +380XXXXXXXXX"
    });
  }

  // Перевірка паролю
  if (!isValidPassword(user.password)) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long"
    });
  }

  if (typeof user.firstName !== 'string' || user.firstName.trim() === '') {
    return res.status(400).json({
      error: true,
      message: "First name must be a non-empty string"
    });
  }
  
  if (typeof user.lastName !== 'string' || user.lastName.trim() === '') {
    return res.status(400).json({
      error: true,
      message: "Last name must be a non-empty string"
    });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const user = req.body;

  const allowedKeys = Object.keys(USER).filter(key => key !== "id");
  const userKeys = Object.keys(user);
  const extraKeys = userKeys.filter(k => !allowedKeys.includes(k));
  const validKeys = userKeys.filter(k => allowedKeys.includes(k));

  if ("id" in user) {
    return res.status(400).json({
      error: true,
      message: "ID must not be updated"
    });

  }
  if (extraKeys.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Unexpected fields: ${extraKeys.join(", ")}`
    });
  }

  if (validKeys.length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided for update"
    });
  }

  if (user.email && !isGmail(user.email)) {
    return res.status(400).json({
      error: true,
      message: "Email must be a gmail address"
    });
  }

  if (user.phoneNumber && !isPhone(user.phoneNumber)) {
    return res.status(400).json({
      error: true,
      message: "Phone must match +380XXXXXXXXX"
    });
  }

  if (user.password && !isValidPassword(user.password)) {
    return res.status(400).json({
      error: true,
      message: "Password must be at least 3 characters long"
    });
  }
  if (user.firstName && (typeof user.firstName !== 'string' || user.firstName.trim() === '')) {
    return res.status(400).json({
      error: true,
      message: "First name must be a non-empty string"
    });
  }

  if (user.lastName && (typeof user.lastName !== 'string' || user.lastName.trim() === '')) {
    return res.status(400).json({
      error: true,
      message: "Last name must be a non-empty string"
    });
  }

  next();
};

export { createUserValid, updateUserValid };
