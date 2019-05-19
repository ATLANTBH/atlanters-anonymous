export default ({ models }) => {
  const { Answer, Poll, PollTemplate } = models;
  return async (req, res, next) => {
    const answers = req.body;
    const pollId = req.params.pollId;
    const pollTemplateId = req.params.id;
    try {
      const poll = await Poll.findById(pollId);
      if(!poll) throw new Error(`Poll with id ${pollId} does not exist`);
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if(!pollTemplate)  throw new Error(`Poll template with id ${pollTemplateId} does not exist`);
      
      if (await poll.isMaxNumAnswersReached(Answer))
        throw new Error(
          `Maximum number of answers reached (${poll.maxNumAnswers})`
        );

      const answer = await Answer.validCreate(pollTemplate.questions, answers);
      await poll.addAnswer(answer);
      await poll.incrementNumAnswers();
      res.send(answer);
    } catch (error) {
      next(new Error(error));
    }
  };
};
