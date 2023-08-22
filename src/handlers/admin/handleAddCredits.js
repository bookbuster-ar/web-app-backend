const { addCredits } = require('../../controllers');

const handleAddCredits = async (req, res) => {
  const { userId } = req.params;
  const { credits } = req.body;
  try {
    const updatedUser = await addCredits(userId, credits);
    return res
      .status(200)
      .json({ msg: 'Creditos agregados', updatedUser: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleAddCredits;
