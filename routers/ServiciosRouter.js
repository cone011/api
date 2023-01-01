const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const servicioController = require("../controllers/ServiciosController");

router.get("/servicios", servicioController.GetAllServicios);

router.get(
  "/servicios/:IdServicios",
  [param("IdServicios").isNumeric().isLength({ min: 1 })],
  servicioController.GetServiciosById
);

router.get(
  "/servicio-by-tipo/:IdTipo",
  [param("IdTipo").isNumeric().isLength({ min: 1 })],
  servicioController.GetServiciosByBase
);

router.post(
  "/servicios",
  [
    body("IdTipo").isNumeric().isLength({ min: 1 }),
    body("Codigo").trim().isLength({ min: 1 }),
    body("Nombre").trim().isLength({ min: 3 }),
  ],
  servicioController.InsertServicios
);

router.put(
  "/servicios/:IdServicio",
  [
    body("IdTipo").isNumeric().isLength({ min: 1 }),
    body("Codigo").trim().isLength({ min: 1 }),
    body("Nombre").trim().isLength({ min: 3 }),
    param("IdServicios").isNumeric().isLength({ min: 1 }),
  ],
  servicioController.UpdateServicios
);

router.delete(
  "/servicios/:IdServicios",
  [param("IdServicios").isNumeric().isLength({ min: 1 })],
  servicioController.DeleteServicios
);

module.exports = router;
