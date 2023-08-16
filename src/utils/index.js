const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');

const timeAgo = (dateString) => {
  const date = moment(dateString).tz('UTC'); // Asumiendo que la fecha es UTC
  const now = moment().tz('UTC');
  const duration = moment.duration(now.diff(date));

  // Establece las reglas para mostrar el mensaje
  if (duration.asMinutes() < 1) {
    return 'hace un momento';
  } else if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else if (duration.asDays() < 30) {
    const days = Math.floor(duration.asDays());
    return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
  } else {
    return `el ${date.format('DD/MM/YYYY')}`;
  }
};

module.exports = {
  timeAgo,
};
