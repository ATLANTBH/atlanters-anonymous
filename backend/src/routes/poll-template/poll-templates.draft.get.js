export default ({ models }) => {
  const { PollTemplate, Poll } = models;
  return async (req, res, next) => {
    const isDraft = req.params.isDraft;
    try {
      const pollTemplates = await PollTemplate.findAllByDraft(isDraft);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
