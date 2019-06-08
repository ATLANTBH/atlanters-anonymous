export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.authenticate(email, password);
      const token = await User.generateAuthenticationToken(user);
      res.cookie('user_id', user.id, {
        httpOnly: true,
        secured: true,
        signed: true,
      });
      res
        .header('x-auth', token)
        .header('access-control-expose-headers', 'x-auth')
        .send(user);
    } catch (error) {
      next(error);
    }
  };
};
