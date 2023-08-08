const handleRegisterLocalUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  await registerUserWithEmail({ name, lastname, email, password });
};

module.exports = handleRegisterLocalUser;
