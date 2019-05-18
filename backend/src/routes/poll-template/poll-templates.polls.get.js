export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const pollTemplateId = req.params.id;
    try {
      const polls = await Poll.findByPollTemplateId(pollTemplateId);
      res.send(polls);
    } catch (error) {
      next(new Error(error));
    }
  };
};
