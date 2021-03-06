export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    let reqUser = req.body;
    try {
      const { user, token } = await User.insert(reqUser);
      res
        .header('x-auth', token)
        .header('access-control-expose-headers', 'x-auth')
        .send(user);
    } catch (error) {
      next(new Error(error));
    }
  };
};
