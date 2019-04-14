import { hash } from 'bcrypt';

function isPasswordValid(password) {
  const validPassword =
    typeof password == 'string' &&
    password.trim() != '' &&
    password.trim().length >= 8;
  return validPassword;
}

async function userExists(email, User) {
  if (await User.findByEmail(email)) return true;
  return false;
}

async function getPasswordHash(inputPassword) {
  return await hash(
    inputPassword,
    parseInt(process.env.SALT_ROUNDS)
  );
}

async function getUserObject(reqUser, User) {
  return User.build({
    email: reqUser.email,
    password: await getPasswordHash(reqUser.password),
    name: reqUser.name,
    surname: reqUser.surname
  })
}

export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    let reqUser = req.body;
    try {
      if (!isPasswordValid(reqUser.password))
        next(new Error('Password must be at least 8 characters long'));
      else if (await userExists(reqUser.email, User))
        next(new Error('User with this email already exists'));
      else {
        const user = await getUserObject(reqUser, User);
        await user.save();
        const token = await user.generateAuthenticationToken();
        res.header('x-auth', token).send(user);
      }
    }
    catch (error) {
      next(new Error(error));
    }
  };
};
