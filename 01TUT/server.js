const os = require('os');
const path = require('path');
const { add, subtract, divide, multiply } = require('./math');

console.log(multiply(2, 5));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());
// console.log(os);

console.log(__dirname); // C:\Dev\node-full-course-for-beginers\01TUT
console.log(__filename); // C:\Dev\node-full-course-for-beginers\01TUT\server.js

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

console.log(path.parse(__filename));
