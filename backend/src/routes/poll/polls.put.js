export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const pollReq = req.body;
    const pollId = req.params.id;
    try {
      const poll = await Poll.findById(pollId);
      if (poll) {
        const updateResult = await poll.update(pollReq);
        res.send(updateResult);
      } else
        next(
          new Error(
            `Poll with id ${pollId} does not exist, please create it first`
          )
        );
    } catch (error) {
      next(new Error(error));
    }
  };
};
