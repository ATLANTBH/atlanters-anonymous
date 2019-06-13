export default ({ models }) => {
  const { PollTemplate, Poll } = models;
  return async (req, res, next) => {
    const { count, isDraft } = req.params;
    try {
      const pollTemplates = await PollTemplate.findAllByDraft(count, isDraft);
      res.send(pollTemplates);
    } catch (error) {
      next(new Error(error));
    }
  };
};
