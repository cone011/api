const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../util/ErrorHandler");
const { ResultNoFound } = require("../util/ResultNotFound");
const { ValidationValue } = require("../util/ValidationValue");
const db = require("../config/database");

exports.GetAllTipo = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllTipo();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetTipoById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdTipo = req.params.IdTipo;
    const result = await db.query("CALL pa_GetTipoById(?);", [IdTipo]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.InsertTipo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const Nombre = req.body.Nombre;
    const result = await db.query("CALL pa_InsertTipo(?);", [Nombre]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.UpdateTipo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const Nombre = req.body.Nombre;
    const IdTipo = req.paras.IdTipo;
    const result = await db.query("CALL pa_UpdateTipo(?,?);", [Nombre, IdTipo]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.DeleteTipo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdTipo = req.params.IdTipo;
    const result = await db.query("CALL pa_DeleteTipo(?);", [IdTipo]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isDeleted: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};
