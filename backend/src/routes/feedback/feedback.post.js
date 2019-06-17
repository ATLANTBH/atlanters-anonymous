export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    const feedbackReq = req.body;
    try {
      const feedback = await Feedback.create(feedbackReq);
      res.send(feedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
