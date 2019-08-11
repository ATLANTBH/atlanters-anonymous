export default ({ models }) => {
  const { Feedback, Message } = models;
  return async (req, res, next) => {
    const messageReq = req.body;
    try {
      await Feedback.sendMail(messageReq);
      let feedback = await Feedback.create();
      const message = await Message.create(messageReq);
      feedback = await feedback.addMessage(message);
      res.send(feedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
