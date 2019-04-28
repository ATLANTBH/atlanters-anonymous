export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    try {
      const polls = await Poll.findAll();
      res.send(polls);
    } catch (error) {
      next(new Error(error));
    }
  };
};
