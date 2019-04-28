export default ({ models }) => {
  const { Question } = models;
  return async (req, res, next) => {
    const questionReq = req.body;
    const questionId = req.params.id;
    try {
      const question = await Question.findById(questionId);
      if (question) {
        const updateResult = await question.update(questionReq);
        res.send(updateResult);
      } else
        next(
          new Error(
            `Question with id ${questionId} does not exist, please create it first`
          )
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
