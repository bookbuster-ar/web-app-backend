const app = require('./src/app');
const sequelize = require('./src/config/database');
//const { v4: uuidv4 } = require('uuid');

require('./src/models');
require('./src/models/associations');

app.listen(3001, async () => {
  try {
    await sequelize.sync({ force: false, logging: false });
  } catch (error) {
    console.log(error.message);
  }
});
