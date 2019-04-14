export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateReq = req.body;
    const userCreator = req.user;
    try {
      if (!(await PollTemplate.findByTitle(pollTemplateReq.title))) {
        const pollTemplate = await PollTemplate.create(pollTemplateReq);
        await userCreator.setPollTemplates([pollTemplate]);
        res.send(pollTemplate);
      } else next(new Error('Poll template with this title already exists'));
    } catch (error) {
      next(new Error(error));
    }
  };
};
