export default ({ models }) => {
  const { Poll, Answer } = models;
  return async (req, res, next) => {
    try {
      const polls = await Poll.findAllWithAssoc([Answer]);
      res.send(polls);
    } catch (error) {
      next(new Error(error));
    }
  };
};
