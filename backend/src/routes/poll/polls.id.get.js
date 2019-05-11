export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const pollId = req.params.id;
    try {
      const poll = await Poll.findById(pollId);
      if(poll) res.send(poll);
      else throw new Error(`Poll with id ${pollId} does not exist, please create it first`);
    } catch (error) {
      next(new Error(error));
    }
  };
};
