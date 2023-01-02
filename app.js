const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const tipoRouter = require("./routers/TipoRouter");
const servicioRouter = require("./routers/ServiciosRouter");
const usuarioRouter = require("./routers/UsuarioRouter");
const comprobanteRouter = require("./routers/ComprobanteRouter");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "acces.log"),
  { flags: "a" }
);

app.use(bodyParser.json());
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(morgan("combined", { stream: accessLogStream }));
dotenv.config();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", tipoRouter);
app.use("/api", servicioRouter);
app.use("/api", usuarioRouter);
app.use("/api", comprobanteRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ codeError: status, message: message });
});

app.listen(port, () => {
  console.log(`The cobranza api listening at http://localhost:${port}`);
});
