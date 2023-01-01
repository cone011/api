exports.ValidationValue = (errors) => {
  if (!errors.isEmpty()) {
    const error = new Error(
      "Favor de ingresar los parametros correctos para ejecturar el procedimiento"
    );
    error.statusCode = 422;
    throw error;
  }
};
