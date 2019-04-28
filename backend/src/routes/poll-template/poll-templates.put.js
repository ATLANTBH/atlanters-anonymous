export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateReq = req.body;
    const pollTemplateId = req.params.id;
    try {
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if (pollTemplate) {
        const updateResult = await pollTemplate.update(pollTemplateReq);
        res.send(updateResult);
      } else
        next(
          new Error(
            `Poll template with id ${pollTemplateId} does not exist, please create it first`
          )
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
