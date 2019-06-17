export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    try {
      const feedback = await Feedback.findById(feedbackId);
      if (feedback) res.send(feedback);
      else throw new Error(`Feedback with id ${feedbackId} does not exist`);
    } catch (error) {
      next(new Error(error));
    }
  };
};
