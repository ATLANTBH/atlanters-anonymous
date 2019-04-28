export default ({ models }) => {
  const { Poll, PollTemplate } = models;
  return async (req, res, next) => {
    const pollReq = req.body;
    const userCreator = req.user;
    const pollTemplateId = req.params.pollTemplateId;
    try {
      const pollTemplate = await PollTemplate.findById(pollTemplateId);
      if (pollTemplate) {
        const poll = await Poll.create(pollReq);
        await userCreator.addPoll(poll);
        await pollTemplate.addPoll(poll);
        res.send(poll);
      } else
        next(
          new Error(`Poll template with id ${pollTemplateId} does not exist`)
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
