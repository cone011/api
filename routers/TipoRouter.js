const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const tipoController = require("../controllers/TipoController");

router.get("/tipo", tipoController.GetAllTipo);

router.get(
  "/tipo/:IdTipo",
  [param("IdTipo").isNumeric().isLength({ min: 1 })],
  tipoController.GetTipoById
);

router.post(
  "/tipo",
  [body("Nombre").trim().isLength({ min: 1 })],
  tipoController.InsertTipo
);

router.put(
  "/tipo/:IdTIpo",
  [
    body("Nombre").trim().isLength({ min: 1 }),
    param("IdTipo").isNumeric().isLength({ min: 1 }),
  ],
  tipoController.UpdateTipo
);

router.delete(
  "/tipo/:IdTipo",
  [param("IdTipo").isNumeric().isLength({ min: 1 })],
  tipoController.DeleteTipo
);

module.exports = router;
