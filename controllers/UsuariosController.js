const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../util/ErrorHandler");
const { ResultNoFound } = require("../util/ResultNotFound");
const { ValidationValue } = require("../util/ValidationValue");
const bcrypt = require("bcryptjs");

exports.GetAllUsuarios = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllUsuario();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetUsuarioById = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllUsuario();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result });
  } catch (err) {
    ErrorHandler(err, next);
  }
};
