async function pollTemplateExists(title, PollTemplate) {
  const res = await PollTemplate.findByTitle(title)
  if (res) return true;
  return false;
}

export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateReq = req.body;
    const userCreator = req.user;
    try {
      if (!await pollTemplateExists(pollTemplateReq.title, PollTemplate)) {
        const pollTemplate = await PollTemplate.create(pollTemplateReq);
        await userCreator.setPollTemplates([pollTemplate]);
        res.send(pollTemplate);
      }
      else next(new Error('Poll template with this title already exists'));
    }
    catch (error) {
      next(new Error(error));
    }

  }
}