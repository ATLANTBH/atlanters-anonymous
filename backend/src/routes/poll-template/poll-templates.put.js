export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateReq = req.body;
    try {
      const pollTemplate = await PollTemplate.findById(pollTemplateReq.id);
      if (pollTemplate) {
        const updateResult = await pollTemplate.update(pollTemplateReq);
        res.send(updateResult);
      } else
        next(new Error('Poll template does not exist, please create it first'));
    } catch (error) {
      next(new Error(error));
    }
  };
};
