export default ({ models }) => {
  const { Feedback, Message } = models;
  return async (req, res, next) => {
    try {
      const allFeedback = await Feedback.findAll({
        include: [{ model: Message }],
        order: [['createdAt', 'ASC']],
      });
      res.send(allFeedback);
    } catch (error) {
      next(new Error(error));
    }
  };
};
