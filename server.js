const port = process.env.PORT || 3000;
require('dotenv').config();
require('./db.js')();
const app = require('./app');

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
