export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const token = req.header('x-auth');
    try {
      const user = await User.findByAuthenticationToken(token);
      if (!user) next(new Error('Please log in to continue'));
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      next(new Error(error));
    }
  };
};
