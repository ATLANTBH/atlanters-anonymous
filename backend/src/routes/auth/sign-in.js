import { hash, compare } from 'bcrypt';

export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) next(new Error('User with this email does not exist'));
    else {
      const isPasswordEqual = await compare(password, user.password);
      if (!isPasswordEqual) next(new Error('Password incorrect'));
      else {
        res.cookie('user_id', user.id, {
          httpOnly: true,
          secured: true,
          signed: true,
        });
        res.json({
          msg: 'Logged in',
        });
      }
    }
  };
};
