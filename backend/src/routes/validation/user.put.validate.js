import { compare } from 'bcrypt';

export default async (User, user, reqUser) => {
  let password = reqUser.password;
  const email = reqUser.email;
  if (email) {
    if (email === user.email)
      throw new Error(`Email matches the one currently in use`);
    await User.checkEmailValid(reqUser.email);
  }
  if (password) {
    User.checkPasswordValid(reqUser.password);
    if (await compare(password, user.password))
      throw new Error(`Password matches the one currently in use`);
    password = await User.getPasswordHash(password);
  }
  return {
    email: email,
    password: password,
    name: reqUser.name,
    surname: reqUser.surname,
  };
};
