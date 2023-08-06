const app = require('./src/app');
const sequelize = require('./src/config/database');

const data = require('./src/utils/data');
// const loadData = require('./src/utils/loadData');

require('./src/models');
require('./src/models/associations');

app.listen(3001, async () => {
  try {
    await sequelize.sync({ alter: true, logging: false });
    // loadData(data);
  } catch (error) {
    console.log(error.message);
  }
});
