const setResponseBody = (
  err = { message: "Something Went Wrong!" },
  results = null
) => ({
  success: err ? false : true,
  results,
  message: err ? err.message : "request succeeded!",
});

module.exports = {
  setResponseBody: setResponseBody,
};
