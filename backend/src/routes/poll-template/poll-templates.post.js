export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const userCreator = req.user;
    const pollTemplateReq = req.body;
    try {
      if (await PollTemplate.findByTitle(pollTemplateReq.title))
        throw new Error(
          `Poll template with title ${pollTemplateReq.title} already exists`
        );
      const pollTemplate = await PollTemplate.validCreate(pollTemplateReq);
      await userCreator.addPollTemplate(pollTemplate);
      res.send(pollTemplate);
    } catch (error) {
      next(new Error(error));
    }
  };
};
