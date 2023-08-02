const app = require('./src/app');
const sequelize = require('./src/config/database');

require('./src/models');
require('./src/models/associations');

app.listen(3001, async () => {
  try {
    await sequelize.sync({ force: true, logging: false });
    console.log('Server running on port 3001');
  } catch (error) {
    console.log(error.message);
  }
});
