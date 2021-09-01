//objeto de respuesta
// Data can be a message or data.
exports.success = function (res, data, status = 200) {
  res.status(status).send({ error: null, body: data });
};

exports.error = function (res, message, status = 500, details) {
  details && console.error("Error details: ", details);

  res.status(status || 500).send({ error: message, body: null });
};
