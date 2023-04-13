const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const timeout = (callback, time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, time);
  });

const fileOps = async () => {
  try {
    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'starter.txt'),
      "I'm batman kurde"
    );

    const data = await fsPromises.readFile(
      path.join(__dirname, 'files', 'starter.txt'),
      'utf8'
    );

    await timeout(async () => {
      await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'));
    }, 900);

    await fsPromises.writeFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, 'files', 'promiseWrite.txt'),
      '\n\nNice to meet you.'
    );

    await timeout(async () => {
      console.log('rename leci');
      await fsPromises.rename(
        path.join(__dirname, 'files', 'promiseWrite.txt'),
        path.join(__dirname, 'files', 'promiseComplete.txt')
      );
    }, 1200);

    const newData = await fsPromises.readFile(
      path.join(__dirname, 'files', 'promiseComplete.txt'),
      'utf8'
    );

    console.log(51, newData);

    // await fsPromises.unlink(
    //   path.join(__dirname, 'files', 'promiseComplete.txt')
    // );
    timeout(async () => {
      fs.unlink(path.join(__dirname, 'files', 'promiseComplete.txt'), (err) => {
        if (err) {
          throw err;
        }
        console.log('promiseComplete deleted');
      });
    }, 900);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, 'files', 'reply.txt'),
//   'Nice to meet you',
//   (err) => {
//     if (err) throw err;
//     console.log('Write complete');

//     fs.appendFile(
//       path.join(__dirname, 'files', 'reply.txt'),
//       '\n\nYes is is',
//       (err) => {
//         if (err) throw err;
//         console.log('Append complete');
//         setTimeout(() => {
//           fs.rename(
//             path.join(__dirname, 'files', 'reply.txt'),
//             path.join(__dirname, 'files', 'newReply.txt'),
//             (err) => {
//               if (err) throw err;
//               console.log('Rename complete');
//             }
//           );
//         }, 1400);
//       }
//     );
//   }
// );

process.on('uncaught Exception', (err) => {
  console.log(`There was as uncougt error', ${err}`);
  process.exit(1);
});
