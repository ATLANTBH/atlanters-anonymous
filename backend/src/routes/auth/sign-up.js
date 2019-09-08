import jwt from 'jsonwebtoken';

export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    let reqUser = req.body;
    try {
      jwt.verify(reqUser.key, process.env.JWT_SECRET_SIGNUP);
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
