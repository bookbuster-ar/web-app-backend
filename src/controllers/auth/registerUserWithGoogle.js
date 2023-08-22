const admin = require('../../config/firebase/admin');
const {
  User,
  Role,
  UserImage,
  Session,
  BookShelves,
  BookShelfCategory,
} = require('../../models/index');
const sequelize = require('../../config/database');
const { Op } = require('sequelize');

const registerUserWithGoogle = async (token) => {
  return sequelize.transaction(async (t) => {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const [name, last_name] = decodedToken.name.split(' ');

    const userRole = await Role.findOne({
      where: { name: { [Op.iLike]: '%user%' } },
      transaction: t,
    });

    if (!userRole) {
      throw Error('Role not found');
    }

    const image = await UserImage.create(
      { image: decodedToken.picture },
      { transaction: t }
    );

    const [user, wasCreated] = await User.findOrCreate({
      where: { email: decodedToken.email },
      defaults: {
        firebase_id: decodedToken.uid,
        name: name,
        last_name: last_name,
        email: decodedToken.email,
        email_verified: decodedToken.email_verified,
        role_id: userRole.id,
        image_id: image.id,
      },
      transaction: t,
    });

    // if (!wasCreated) {
    //   throw Error('El usuario ya está registrado');
    // }

    const [session, Created] = await Session.findOrCreate({
      where: { user_id: user.id, session_status: true },
      defaults: {
        session_status: true,
        user_id: user.id,
      },
      transaction: t,
    });

    // if (!Created) {
    //   throw Error('El usuario tiene ya una sesión activa');
    // }

    // 2. Asignar una BookShelves a cada usuario
    const [createdBookShelves] = await BookShelves.findOrCreate({
      where: { user_id: user.id },
      transaction: t,
    });

    // 3. Crear BookShelfCategory para el BookShelves creado
    const shelfCategories = ['Leer', 'Actualmente Leyendo', 'Quiero leer'];

    for (const category of shelfCategories) {
      await BookShelfCategory.findOrCreate({
        where: {
          name: category,
          book_shelves_id: createdBookShelves.id,
        },
        transaction: t,
      });
    }

    const { role_id, image_id, firebase_id, ...userWithoutRoleId } =
      user.toJSON();

    return {
      session_id: session.id,
      user: { ...userWithoutRoleId },
    };
  });
};

module.exports = registerUserWithGoogle;
