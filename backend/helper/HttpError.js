const messageList = {
  400: "Bad Request",
  401: "Unauthrized",
  403: "Forbidden",
  404: "Not found",
  409: "Coflict",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};

module.exports = HttpError;
