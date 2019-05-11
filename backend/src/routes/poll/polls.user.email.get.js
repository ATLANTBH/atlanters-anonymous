export default ({ models }) => {
  const { Poll, User } = models;
  return async (req, res, next) => {
    let userEmail = req.body;
    try {
      userEmail = userEmail.email;
      if(userEmail) {
        const user = await User.findByEmail(userEmail);
        if(user) {
          const polls = await Poll.findByUserId(user.id);
          res.send(polls);
        }
        else throw new Error(`User with email ${userEmail} does not exist`);
      }
      else throw new Error('Email not provided');
    } catch (error) {
      next(new Error(error));
    }
  };
};
