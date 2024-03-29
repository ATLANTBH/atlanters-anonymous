export default ({ models }) => {
  const { Feedback, Message } = models;
  return async (req, res, next) => {
    try {
      const allFeedback = await Feedback.getAllFeedbacks(Message);
      res.send(allFeedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
