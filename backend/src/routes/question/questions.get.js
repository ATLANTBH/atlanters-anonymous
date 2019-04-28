export default ({ models }) => {
  const { Question } = models;
  return async (req, res, next) => {
    try {
      const questions = await Question.findAll();
      res.send(questions);
    } catch (error) {
      next(new Error(error));
    }
  };
};
