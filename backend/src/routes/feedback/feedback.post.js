import { GET_DETAILED_MESSAGE_HTML } from '../utils';

export default ({ models }) => {
  const { Feedback, Message } = models;
  return async (req, res, next) => {
    const messageReq = req.body;
    try {
      let feedback = await Feedback.create();
      await Feedback.sendMail(GET_DETAILED_MESSAGE_HTML(feedback, messageReq));
      const message = await Message.create(messageReq);
      feedback = await feedback.addMessage(message);
      res.send(feedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
