import { GET_DETAILED_MESSAGE_HTML, GET_FEEDBACK_URL } from '../utils';

export default ({ models }) => {
  const { Feedback, Message, User } = models;
  return async (req, res, next) => {
    const feedbackId = req.params.id;
    const userId = req.params.userId;
    const messageReq = req.body;
    try {
      const feedback = await Feedback.findById(feedbackId);
      if (!feedback)
        throw new Error(`Feedback with id ${feedbackId} does not exist`);
      if (feedback.isClosed) throw new Error('This ticket is closed');
      let user = null;
      if (userId) {
        user = await User.findById(userId);
        if (!user) throw new Error(`User with id ${userId} does not exist`);
      } else {
        const feedbackUrl = GET_FEEDBACK_URL(req, feedbackId);
        Feedback.sendMail(
          GET_DETAILED_MESSAGE_HTML(feedback, feedbackUrl, messageReq)
        );
      }
      let message = await Message.create(messageReq);
      if (user) await user.addMessage(message);
      await feedback.addMessage(message);
      message = await Message.findById(message.id, User);
      res.send(message);
    } catch (error) {
      next(new Error(error));
    }
  };
};
