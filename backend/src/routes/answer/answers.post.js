import validateAnswer from '../validation/answer.post.validate';

export default ({ models }) => {
  const { Answer, Poll, PollTemplate } = models;
  return async (req, res, next) => {
    const answers = req.body;
    const pollId = req.params.pollId;
    const pollTemplateId = req.params.pollTemplateId;
    try {
      const poll = await validateAnswer(
        Answer,
        Poll,
        PollTemplate,
        answers,
        pollId,
        pollTemplateId
      );
      const answer = await Answer.create({ content: answers });
      await poll.addAnswer(answer);
      await poll.incrementNumAnswers();
      res.send(answer);
    } catch (error) {
      next(new Error(error));
    }
  };
};
