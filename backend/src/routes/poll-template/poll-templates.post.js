export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const userCreator = req.user;
    try {
      const pollTemplate = await PollTemplate.create(req.pollTemplate);
      await userCreator.addPollTemplate(pollTemplate);
      res.send(pollTemplate);
    } catch (error) {
      next(new Error(error));
    }
  };
};
