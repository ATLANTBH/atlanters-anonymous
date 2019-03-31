import { hash, compare } from 'bcrypt';

function isPasswordValid(password) {
  const validPassword = typeof password == 'string' &&
    password.trim() != '' &&
    password.trim().length >= 8;
  return validPassword;
}

export default (models) => {
  return async (req, res, next) => {
    let userObj = req.body;
    if (!isPasswordValid(userObj.password)) next(new Error("Password not valid, must be at least 8 characters long"));
    else {
      userObj.password = await hash(userObj.password, parseInt(process.env.SALT_ROUNDS));
      const [user, isCreated] = await models.User.findByEmailOrCreate(userObj);
      if (isCreated) {
        res.json({
          user,
          isCreated
        });
      }
      else next(new Error("User with this email already exists"));
    }
  };
}