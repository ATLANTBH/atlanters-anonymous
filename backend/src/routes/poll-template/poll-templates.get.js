export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    try {
      const pollTemplates = await PollTemplate.findAll();
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
