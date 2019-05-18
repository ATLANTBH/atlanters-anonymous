export default ({ models }) => {
  const { Answer } = models;
  return async (req, res, next) => {
    const answerId = req.params.id;
    try {
      const answer = await Answer.findById(answerId);
      if (answer) res.send(answer);
      else
        throw new Error(
          `Poll template with id ${answerId} does not exist, please create it first`
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
