export default ({ models }) => {
  const { User } = models;
  const { PollTemplate } = models;
  return async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: [PollTemplate]
      });
      res.send(users);
    }
    catch (error) {
      next(new Error(error));
    }
  };
};