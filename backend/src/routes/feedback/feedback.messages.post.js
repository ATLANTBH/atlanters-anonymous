import { formatDate } from '../utils';

const getDetailedMessage = (feedback, { text }) => {
  const details =
    'Ticket id: ' +
    feedback.id +
    '\n' +
    'Ticket created at: ' +
    formatDate(feedback.createdAt) +
    '\n' +
    'Message sent at: ' +
    formatDate(new Date()) +
    '\n\n';
  return { text: details + text };
};

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
      let user = null;
      if (userId) {
        user = await User.findById(userId);
        if (!user) throw new Error(`User with id ${userId} does not exist`);
      } else {
        await Feedback.sendMail(getDetailedMessage(feedback, messageReq));
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
