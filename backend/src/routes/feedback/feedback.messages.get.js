export default ({ models }) => {
  const { Message } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const messages = await Message.findByFeedbackId(feedbackId);
      res.send(messages);
    } catch (error) {
      next(new Error(error));
    }
  };
};
