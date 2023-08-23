const app = require('./src/app');
const sequelize = require('./src/config/database');
const { PORT } = require('./src/utils/env');

require('./src/models');
require('./src/models/associations');

app.listen(PORT || 3001, async () => {
  try {
    await sequelize.sync({ force: false, logging: false });
  } catch (error) {
    console.error(error.message);
  }
});
