export default async (req, res, next) => {
  const user = req.user;
  const token = req.token;
  try {
    await user.removeAuthenticationToken(token);
    res.send();
  } catch (error) {
    next(new Error(error));
  }
};
