exports.ResultNoFound = (result) => {
  if (!result) {
    const error = new Error("Datos no encontrados");
    error.statusCode = 422;
    throw error;
  }
};
