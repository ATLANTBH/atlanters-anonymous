export default ({ models }) => {
  const { Answer } = models;
  return async (req, res, next) => {
    const pollId = req.params.pollId;
    try {
      const answers = await Answer.findByPollId(pollId);
      res.send(answers);
    } catch (error) {
      next(new Error(error));
    }
  };
};
