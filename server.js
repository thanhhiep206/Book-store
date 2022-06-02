const port = process.env.PORT || 3000;
require('dotenv').config();
const chalk = require('chalk');
require('./db.js')();
const app = require('./app');

app.listen(port, () => {
  console.log(chalk.red(`Server running in port ${port}`));
});
