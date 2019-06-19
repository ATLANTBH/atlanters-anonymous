export default ({ models }) => {
  const { Feedback } = models;
  return async (req, res, next) => {
    const feedbackReq = req.body;
    try {
      const feedback = await Feedback.create(feedbackReq);
      const sendEmail = await Feedback.sendMail(feedback);
      console.log('Email sent: ', sendEmail);
      res.send(feedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
