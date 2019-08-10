export default ({ models }) => {
  const { Feedback, Message, User } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    const userId = req.params.userId;
    const messageReq = req.body;
    try {
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback)
        throw new Error(`Feedback with id ${feedbackId} does not exist`);
      let user = null;
      if (userId) {
        user = await User.findById(userId);
        if (!user) throw new Error(`User with id ${userId} does not exist`);
      }
      const message = await Message.create(messageReq);
      if (user) user.addMessage(message);
      await feedback.addMessage(message);
      res.send(message);
    } catch (error) {
      next(new Error(error));
    }
  };
};
