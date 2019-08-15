export default ({ models }) => {
  const { Message, User, Feedback } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback)
        throw new Error(`Feedback with id ${feedbackId} does not exist`);
      const messages = await Message.findByFeedbackId(feedbackId, User);
      res.send({ feedback, messages });
    } catch (error) {
      next(new Error(error));
    }
  };
};
