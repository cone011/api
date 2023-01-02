const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../util/ErrorHandler");
const { ResultNoFound } = require("../util/ResultNotFound");
const { ValidationValue } = require("../util/ValidationValue");
const db = require("../config/database");

exports.GetAllServicios = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllServicios();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetServiciosById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdServicio = req.params.IdServicios;
    const result = await db.query("CALL pa_GetServicioById(?);", [IdServicio]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetServiciosByBase = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdTipo = req.params.IdTipo;
    const result = await db.query("CALL pa_GetServicioByTipo(?);", [IdTipo]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.InsertServicios = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdTipo = req.body.IdTipo;
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const result = await db.query("CALL pa_InsertServicio(?,?,?);", [
      IdTipo,
      Codigo,
      Nombre,
    ]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.UpdateServicios = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdTipo = req.body.IdTipo;
    const Codigo = req.body.Codigo;
    const Nombre = req.body.Nombre;
    const IdServicio = req.params.IdServicio;
    const result = await db.query("CALL pa_InsertServicio(?,?,?,?);", [
      IdTipo,
      Codigo,
      Nombre,
      IdServicio,
    ]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.DeleteServicios = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdServicio = req.params.IdServicio;
    const result = await db.query("CALL pa_DeleteServicio(?);", [IdServicio]);
    ResultNoFound(result);
    res.status(201).json({ mensaje: "OK", isDeleted: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};
