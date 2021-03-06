export default ({ models }) => {
  const { User, PollTemplate, Poll } = models;
  return async (req, res, next) => {
    try {
      const users = await User.findAllWithAssoc([PollTemplate, Poll]);
      res.send(users);
    } catch (error) {
      next(new Error(error));
    }
  };
};
