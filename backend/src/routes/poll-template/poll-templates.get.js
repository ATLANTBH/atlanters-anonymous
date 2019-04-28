export default ({ models }) => {
  const { PollTemplate, Question } = models;
  return async (req, res, next) => {
    try {
      const pollTemplates = await PollTemplate.findAllWithAssoc([Question]);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
