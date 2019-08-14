export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    const feedbackReq = req.body;
    try {
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback)
        throw new Error(`Feedback with id ${feedbackId} does not exist`);
      const updateResult = await feedback.update(feedbackReq);
      console.log(feedbackReq);
      res.send(updateResult);
    } catch (error) {
      next(new Error(error));
    }
  };
};
