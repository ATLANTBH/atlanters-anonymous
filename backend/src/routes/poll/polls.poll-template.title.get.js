export default ({ models }) => {
  const { Poll, PollTemplate } = models;
  return async (req, res, next) => {
    const pollTemplateTitle = req.params.pollTemplateTitle;
    try {
      const pollTemplate = await PollTemplate.findByTitle(
        pollTemplateTitle,
        Poll
      );
      if (pollTemplate) res.send(pollTemplate.Polls);
      else
        throw new Error(
          `Poll template with title ${pollTemplateTitle} does not exist, please create it first`
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
