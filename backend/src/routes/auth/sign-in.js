import { hash, compare } from 'bcrypt';

async function authenticateUser(email, password, User, next) {
  const user = await User.findByEmail(email);
  if (!user) next(new Error('User with this email does not exist'));
  else {
    const isPasswordEqual = await compare(password, user.password);
    if (!isPasswordEqual) next(new Error('Password incorrect'));
    return user;
  }
}

export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password, User, next);
    try {
      const token = await user.generateAuthenticationToken();
      res.cookie('user_id', user.id, {
        httpOnly: true,
        secured: true,
        signed: true,
      });
      res.header('x-auth', token).send(user);
      return token;
    }
    catch (error) {
      next(new Error(error))
    }
  };
};
