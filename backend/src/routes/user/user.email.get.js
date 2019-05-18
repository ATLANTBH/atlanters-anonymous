export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const userEmail = req.body.email;
    try {
      const user = await User.findByEmail(userEmail);
      if (user) res.send(user);
      else
        throw new Error(
          `User with email ${userEmail} does not exist, please create it first`
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
