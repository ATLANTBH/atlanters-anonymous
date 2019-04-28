export default ({ models }) => {
  const { PollTemplate, Question, Poll } = models;
  return async (req, res, next) => {
    try {
      const pollTemplates = await PollTemplate.findAllWithAssoc([
        Question,
        Poll,
      ]);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
