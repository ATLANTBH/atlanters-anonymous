export default ({ models }) => {
  const { Question } = models;
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      const question = await Question.findById(id);
      if (question) {
        const deleteResult = await question.destroy();
        res.send(deleteResult);
      } else next(new Error(`Question with id ${id} does not exist`));
    } catch (error) {
      next(new Error(error));
    }
  };
};
