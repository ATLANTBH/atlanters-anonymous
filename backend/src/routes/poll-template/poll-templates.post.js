import validatePollTemplate from '../validation/poll-template.post.validate';

export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const userCreator = req.user;
    const pollTemplateReq = req.body;
    try {
      await validatePollTemplate(PollTemplate, pollTemplateReq)
      const pollTemplate = await PollTemplate.create(pollTemplateReq);
      await userCreator.addPollTemplate(pollTemplate);
      res.send(pollTemplate);
    } catch (error) {
      next(new Error(error));
    }
  };
};
