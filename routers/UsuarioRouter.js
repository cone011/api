const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const usuarioController = require("../controllers/UsuariosController");
const db = require("../config/database");

router.get("/usuario", usuarioController.GetAllUsuarios);

router.get(
  "/usuario/:IdUsuario",
  [param("IdUsuario").isNumeric().isLength({ min: 1 })],
  usuarioController.GetUsuarioById
);

router.get(
  "/search-usuario/:sqlSearch",
  [param("sqlSearch").trim().isLength({ min: 3 })],
  usuarioController.GetSearchUsuario
);

router.post(
  "/usuario",
  [
    body("UserName").trim().isLength({ min: 5 }),
    body("Password").trim().isLength({ min: 5 }),
    body("Nombre").trim().isLength({ min: 5 }),
    body("Apellido").trim().isLength({ min: 5 }),
    body("Cedula")
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        return db
          .query("CALL pa_GetValidCedula(?)", [{ Cedula: value }])
          .then((userDoc) => {
            if (userDoc) {
              return Promise.reject("Ya existe este usuario con esta cedula");
            }
          });
      }),
  ],
  usuarioController.InsertUsuario
);

router.post(
  "/login-usuario",
  [
    body("UserName").trim().isLength({ min: 5 }),
    body("Password").trim().isLength({ min: 5 }),
  ],
  usuarioController.GetLoginUsuario
);

router.put(
  "/usuario/:IdUsuario",
  [
    param("IdUsuario").isNumeric().isLength({ min: 1 }),
    body("UserName").trim().isLength({ min: 5 }),
    body("Password").trim().isLength({ min: 5 }),
    body("Nombre").trim().isLength({ min: 5 }),
    body("Apellido").trim().isLength({ min: 5 }),
    body("Cedula").trim().isLength({ min: 6 }),
  ],
  usuarioController.UpdateUsuario
);

router.delete(
  "/usuario/:IdUsuario",
  [param("IdServicios").isNumeric().isLength({ min: 1 })],
  usuarioController.DeleteUsuario
);

module.exports = router;
