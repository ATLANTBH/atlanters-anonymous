export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    const feedbackReq = req.body;
    try {
      await Feedback.sendMail(feedbackReq);
      res.send();
    } catch (error) {
      next(new Error(error));
    }
  };
};
