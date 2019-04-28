export default ({ models }) => {
  const { Question, PollTemplate } = models;
  return async (req, res, next) => {
    const questionReq = req.body;
    const pollTemplateId = req.params.pollTemplateId;
    try {
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if (pollTemplate) {
        const question = await Question.create(questionReq);
        await pollTemplate.addQuestion(question);
        res.send(question);
      } else
        next(
          new Error(
            `Cannot add question: poll template with id ${pollTemplateId} does not exist`
          )
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
