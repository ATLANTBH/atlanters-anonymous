export default ({ models }) => {
  const { Poll } = models;
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      const poll = await Poll.findById(id);
      if (poll) {
        const deleteResult = await poll.destroy();
        res.send(deleteResult);
      } else next(new Error(`Poll with id ${id} does not exist`));
    } catch (error) {
      next(new Error(error));
    }
  };
};
