const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../util/ErrorHandler");
const { ResultNoFound } = require("../util/ResultNotFound");
const { ValidationValue } = require("../util/ValidationValue");
const db = require("../config/database");

exports.GetAllComprobante = async (req, res, next) => {
  try {
    const result = await db.query("CALL pa_GetAllComprobante();", []);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetComprobanteById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdComprobante = req.params.IdComprobante;
    const result = await db.query("CALL pa_GetComprobanteById(?);", [
      IdComprobante,
    ]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetComprobantePendiente = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdUsuario = req.params.IdUsuario;
    const IdServicio = req.body.param.IdServicio
      ? req.body.param.IdServicio
      : null;
    const result = await db.query("CALL pa_GetComprobantesPendientes(?,?);", [
      IdUsuario,
      IdServicio,
    ]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.UpdatePagoComprobante = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    const IdUsuario = req.body.IdUsuario;
    const MontoDeuda = req.body.MontoDeuda;
    const MontoPagar = req.body.MontoPagar;
    const IdComprobante = req.params.IdComprobante;
    if (MontoPagar > MontoDeuda)
      throw new Error("El monto a pagar no puede ser mayor a la deuda");
    const result = await db.query("CALL pa_UpdatePagoComprobante(?,?,?,?);", [
      IdComprobante,
      IdUsuario,
      MontoDeuda,
      MontoPagar,
    ]);
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", isSaved: true });
  } catch (err) {
    ErrorHandler(err, next);
  }
};

exports.GetComprobanteByFecha = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    ValidationValue(errors);
    console.log(req.body);
    const FechaInicio = req.body.param.FechaInicio;
    const FechaFin = req.body.param.FechaFin;
    const IdServicio = req.body.param.IdServicio
      ? req.body.param.IdServicio
      : null;
    const IdUsuario = req.params.IdUsuario;
    const result = await db.query(
      "CALL pa_GetEstadoListaComprobantes(?,?,?,?);",
      [FechaInicio, FechaFin, IdUsuario, IdServicio]
    );
    ResultNoFound(result);
    res.status(200).json({ mensaje: "OK", resultado: result[0][0] });
  } catch (err) {
    ErrorHandler(err, next);
  }
};
