export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const count = req.params.count;
    try {
      const pollTemplates = await PollTemplate.findAll({ limit: count });
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
