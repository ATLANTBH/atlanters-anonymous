export default ({ models }) => {
  const { Answer } = models;
  return async (req, res, next) => {
    const answers = req.answers;
    const poll = req.poll;
    try {
      const answer = await Answer.create({ content: answers });
      await poll.addAnswer(answer);
      await poll.incrementNumAnswers();
      res.send(answer);
    } catch (error) {
      next(new Error(error));
    }
  };
};
