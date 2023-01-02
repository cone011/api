const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../util/ErrorHandler");
const { ResultNoFound } = require("../util/ResultNotFound");
const { ValidationValue } = require("../util/ValidationValue");
const bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require("jsonwebtoken");

exports.GetAllUsuarios = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllUsuarios();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetUsuarioById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdUsuario = req.params.IdUsuario;
    const result = await db.query("CALL pa_GetUsuarioById(?);", [IdUsuario]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetSearchUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const sqlSearch = req.params.sqlSearch;
    const result = await db.query("CALL pa_GetSeachUsuario(?);", [sqlSearch]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetLoginUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const Username = req.body.Username;
    const Password = req.body.Password;

    const result = await db.query("CALL pa_GetValidUsuario(?);", [Username]);

    const sqlResult = { ...result[0][0][0] };
    const response = await bcrypt.compare(Password, sqlResult.Password);

    if (response) {
      const token = jwt.sign(
        { IdUsuario: sqlResult.IdUsuario, Usuario: sqlResult.User },
        "ServicioApiToken",
        { expiresIn: "1h" }
      );
      res.status(201).json({ message: "OK", result: sqlResult, token: token });
    } else {
      throw new Error(
        "Contraseña incorrecta, favor de ingresar de nuevo los datos para ingresar"
      );
    }
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.InsertUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const Nombre = req.body.Nombre;
    const Apellido = req.body.Apellido;
    const Cedula = req.body.Cedula;
    const hashedPassword = await bcrypt.hash(Password, 12);
    const result = await db.query("CALL pa_InsertUsuario(?,?,?,?,?);", [
      UserName,
      hashedPassword,
      Nombre,
      Apellido,
      Cedula,
    ]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.UpdateUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const Nombre = req.body.Nombre;
    const Apellido = req.body.Apellido;
    const Cedula = req.body.Cedula;
    const IdUsuario = req.params.IdUsuario;
    const hashedPassword = await bcrypt.hash(Password, 12);
    const result = await db.query("CALL pa_UpdateUsuario(?,?,?,?,?,?);", [
      UserName,
      hashedPassword,
      Nombre,
      Apellido,
      Cedula,
      IdUsuario,
    ]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.DeleteUsuario = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdUsuario = req.params.IdUsuario;
    const result = await db.query("CALL pa_DeleteUsuario(?);", [IdUsuario]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", isDeleted: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};
