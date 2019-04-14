export default async (req, res, next) => {
  const user = req.user;
  const token = req.token;
  try {
    await user.removeAuthenticationToken(token);
    res.status(200).send();
  } catch (e) {
    next(new Error(e));
  }
};
