export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    try {
      const allFeedback = await Feedback.findAll();
      res.send(allFeedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
