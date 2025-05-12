const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  
  if (res.err) {
    const status = res.err.status || 400;
    res.status(status).json({
      error: true,
      message: res.err.message || res.err.toString()
    });
  } else if (res.data) {
    res.status(200).json(res.data);
  } else {
    res.status(404).json({
      error: true,
      message: "Not Found"
    });
  }

  // next();
};

export { responseMiddleware };
