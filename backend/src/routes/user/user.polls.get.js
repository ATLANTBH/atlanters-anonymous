export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const userId = req.params.id;
    try {
      const polls = await Poll.findByUserId(userId);
      res.send(polls);
    } catch (error) {
      next(new Error(error));
    }
  };
};
