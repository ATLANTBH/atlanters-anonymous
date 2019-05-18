export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) res.send(user);
      else
        throw new Error(
          `User with id ${userId} does not exist, please create it first`
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
