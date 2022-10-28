const setResponseBody = (
  err = { message: "Soemthing Went Wrong!" },
  results = null
) => ({
  success: err ? false : true,
  results,
  message: err ? err.message : "request succeeded!",
});

module.exports = {
  setResponseBody: setResponseBody,
};
