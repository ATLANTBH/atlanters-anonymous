export default ({ models }) => {
  const { Message, User } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const messages = await Message.findByFeedbackId(feedbackId, User);
      res.send(messages);
    } catch (error) {
      next(new Error(error));
    }
  };
};
