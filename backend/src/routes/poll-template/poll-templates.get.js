export default ({ models }) => {
  const { PollTemplate, Poll } = models;
  return async (req, res, next) => {
    try {
      const pollTemplates = await PollTemplate.findAllWithAssoc([Poll]);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
