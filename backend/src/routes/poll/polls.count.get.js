export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const count = req.params.count;
    try {
      const polls = await Poll.findAll({ limit: count });
      res.send(polls);
    } catch (error) {
      next(new Error(error));
    }
  };
};
