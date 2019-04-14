export default ({ models }) => {
  const { PollTemplate } = models;
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      const pollTemplate = await PollTemplate.findById(id);
      if (pollTemplate) {
        const deleteResult = await pollTemplate.destroy();
        res.send(deleteResult);
      } else
        next(new Error('Poll template does not exist, please create it first'));
    } catch (error) {
      next(new Error(error));
    }
  };
};
