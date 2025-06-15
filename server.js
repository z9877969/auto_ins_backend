const app = require('./app');
const { PORT } = require('./envConfigs');
const { ipnBlackList } = require('./helpers');

ipnBlackList
  .init()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Servre running on port', PORT);
      ipnBlackList;
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
