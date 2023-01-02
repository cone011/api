const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const comprobanteController = require("../controllers/ComprobanteController");
const isAuth = require("../middleware/is-auth");

router.get("/comprobante", comprobanteController.GetAllComprobante);

router.get(
  "/comprobante/:IdComprobante",
  isAuth,
  [param("IdComprobante").isNumeric().isLength({ min: 1 })],
  comprobanteController.GetComprobanteById
);

router.put(
  "/comprobante-pendiente/:IdUsuario",
  isAuth,
  [param("IdUsuario").isNumeric().isLength({ min: 1 })],
  comprobanteController.GetComprobantePendiente
);

router.put(
  "/comprobante-fecha/:IdUsuario",
  isAuth,
  [
    param("IdUsuario").isNumeric().isLength({ min: 1 }),
    body("FechaInicio").isDate(),
    body("FechaFin").isDate(),
  ],
  comprobanteController.GetComprobanteByFecha
);

router.put(
  "/comprobante/:IdComprobante",
  isAuth,
  [
    body("IdUsuario").isNumeric().isLength({ min: 1 }),
    body("MontoDeuda").isNumeric().isLength({ min: 1 }),
    body("MontoPagar").isNumeric().isLength({ min: 1 }),
    param("IdComprobante").isNumeric().isLength({ min: 1 }),
  ],
  comprobanteController.UpdatePagoComprobante
);

module.exports = router;
