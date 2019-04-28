export default ({ models }) => {
  const { Answer, Poll } = models;
  return async (req, res, next) => {
    try {
      const answers = await Answer.findAllWithAssoc([Poll]);
      res.send(answers);
    } catch (error) {
      next(new Error(error));
    }
  };
};
