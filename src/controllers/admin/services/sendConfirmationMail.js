const { USER_NODEMAILER } = require('../../../utils/env');
const transporter = require('../../../config/nodemailer');

const sendConfirmationMail = async (userData, bookData) => {
  const htmlContent = `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #333;">¡Buenas noticias, ${userData.name} ${
    userData.last_name
  }!</h2>
      <p>Estamos emocionados de informarte que tu libro ha sido publicado exitosamente en <strong>Bookbuster</strong>.</p>
      <h3>Detalles de tu publicación:</h3>
      <ul>
          <li>Título del libro: ${bookData.title}</li>
          <li>Autor: ${bookData.author}</li>
          <li>ID de publicación: ${bookData.publicationId}</li>
          <li>Fecha de publicación: ${new Date()}</li>
      </ul> 
      <p>Gracias por ser parte de nuestra creciente comunidad de lectores. Ahora, miles de lectores pueden descubrir y disfrutar del libro que compartiste. Si tienes alguna pregunta o inquietud sobre tu publicación, no dudes en contactarnos.</p>
      <p>Para ver tu libro en Bookbuster, <a href="${''}" style="color: #007BFF; text-decoration: none;">haz clic aquí</a>.</p>
  </div>`;

  const message = {
    from: USER_NODEMAILER,
    to: userData.email,
    subject: '¡Tu libro fue publicado en Bookbuster!',
    html: htmlContent,
  };

  const info = await transporter.sendMail(message);
  return info;
};

module.exports = sendConfirmationMail;
