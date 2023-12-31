const { auth } = require('../../config/firebase/client');
const {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} = require('firebase/auth');
const { User, Role, BookShelves, BookShelfCategory } = require('../../models');
const sequelize = require('../../config/database');

const { Op } = require('sequelize');
const { CLIENT_VERIFY_EMAIL_URL } = require('../../utils/env');

const doesEmailExist = async (email) => {
  return await User.findOne({ where: { email } });
};

const getRole = async () => {
  const role = await Role.findOne({
    where: { name: { [Op.iLike]: '%user%' } },
  });
  return role ?? null;
};

const registerUserWithEmail = async (userInfo) => {
  const { name, lastname, email, password } = userInfo;

  const existingUser = await doesEmailExist(email);
  if (existingUser) {
    throw new Error('Ya existe un usuario con esa dirección de correo');
  }

  let firebaseUser;

  const transaction = await sequelize.transaction();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    firebaseUser = userCredential.user;

    const userRole = await getRole();

    if (!userRole) {
      throw new Error('No se encontró el rol de usuario.');
    }

    const createdUser = await User.create(
      {
        firebase_id: firebaseUser.uid,
        name,
        last_name: lastname,
        email,
        role_id: userRole.id,
      },
      { transaction }
    );

    await sendEmailVerification(firebaseUser, {
      url: CLIENT_VERIFY_EMAIL_URL,
      handleCodeInApp: true,
    });

    await transaction.commit();

    // 2. Asignar una BookShelves a cada usuario
    const createdBookShelves = await BookShelves.create({
      user_id: createdUser.id,
    });

    // 3. Crear BookShelfCategory para el BookShelves creado
    const shelfCategories = ['Leer', 'Actualmente Leyendo', 'Quiero leer'];

    for (const category of shelfCategories) {
      await BookShelfCategory.create({
        name: category,
        book_shelves_id: createdBookShelves.id,
      });
    }

    const { role_id, image_id, firebase_id, ...userWithoutRoleId } =
      createdUser.toJSON();

    return {
      ...userWithoutRoleId,
      role: {
        id: userRole.id,
        name: userRole.name,
      },
    };
  } catch (error) {
    await transaction.rollback();
    if (firebaseUser) {
      await firebaseUser.delete();
    }

    throw error;
  }
};

module.exports = registerUserWithEmail;
