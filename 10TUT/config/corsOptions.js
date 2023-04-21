// Cross Origin Resource Sharing
const allowedOrigins = [
  'https://medium.com',
  // 'http://127.0.0.1:3000',
  'http://localhost:3500',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log({ origin });
    // callback(new Error('Not allowed by CORS kurde'));
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions, allowedOrigins };
