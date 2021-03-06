export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const userId = req.params.id;
    try {
      const pollTemplates = await PollTemplate.findByUserId(userId);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
