export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateId = req.params.id;
    try {
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if(pollTemplate) res.send(pollTemplate);
      else throw new Error(`Poll template with id ${pollTemplateId} does not exist, please create it first`);
    } catch (error) {
      next(new Error(error));
    }
  };
};
