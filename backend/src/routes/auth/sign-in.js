export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    try {
      const token = await User.generateAuthenticationToken(user);
      res.cookie('user_id', user.id, {
        httpOnly: true,
        secured: true,
        signed: true,
      });
      res.header('x-auth', token).send(user);
    } catch (error) {
      next(new Error(error));
    }
  };
};
