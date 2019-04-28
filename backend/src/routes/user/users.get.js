export default ({ models }) => {
  const { User, PollTemplate } = models;
  return async (req, res, next) => {
    try {
      const users = await User.findAllWithAssoc([PollTemplate]);
      res.send(users);
    } catch (error) {
      next(new Error(error));
    }
  };
};
