//objeto de respuesta
exports.success = function (res, message, status = 200) {
  res.status(status || 200).send({ error: null, body: message });
};

exports.error = function (res, message, status = 500, details) {
  details && console.error("Error details: ", details);

  res.status(status || 500).send({ error: message, body: null });
};
