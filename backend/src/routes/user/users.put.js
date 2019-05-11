import getValidUserRequest from '../validation/user.put.validate';

export default ({ models }) => {
  const { User } = models;
  return async (req, res, next) => {
    let reqUser = req.body;
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        reqUser = await getValidUserRequest(User, user, reqUser);
        const updateResult = await user.update(reqUser);
        res.send(updateResult);
      } else
        next(
          new Error(
            `User with id ${userId} does not exist, please create it first`
          )
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
