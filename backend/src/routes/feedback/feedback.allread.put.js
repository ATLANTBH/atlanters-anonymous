export default ({ models }) => {
  const { Feedback, Message} = models;
  return async (req, res, next) => {
    try {
      const feedbacks = await Feedback.markAllAsRead();
      if (!feedbacks)
        throw new Error(`Problem with marking all messages as read`);
      const allFeedback = await Feedback.getAllFeedbacks(Message);
      res.send(allFeedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
