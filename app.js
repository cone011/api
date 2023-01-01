const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const tipoRouter = require("./routers/TipoRouter");

const accessLogStream = fs.createReadStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(bodyParser.json());
app.use(helmet({ crossOriginIsolated: false }));
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

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ codeError: status, message: message });
});

app.listen(port, () => {
  console.log(`The cobranza api listening at http://localhost:${port}`);
});
