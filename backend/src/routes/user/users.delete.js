export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (user) {
        const deleteResult = await user.destroy();
        res.send(deleteResult);
      } else next(new Error(`User with id ${id} does not exist`));
    } catch (error) {
      next(new Error(error));
    }
  };
};
