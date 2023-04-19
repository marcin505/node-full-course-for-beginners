const allowedOrigins = [
  'https://medium.com',
  'http://127.0.0.1:3000',
  'http://localhost:3500',
];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
