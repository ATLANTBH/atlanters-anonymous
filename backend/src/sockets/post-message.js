async function resolveUser(User, userId) {
  if (userId === -1) return null;
  const user = await User.findById(userId);
  if (!user) throw new Error(`User with id ${userId} does not exist`);
  return user;
}

export default async (models, feedbackId, userId, text) => {
  const { Feedback, Message, User } = models;
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback)
      throw new Error(`Feedback with id ${feedbackId} does not exist`);
    const user = await resolveUser(User, userId);
    const message = await Message.create({ text });
    if (user) await user.addMessage(message);
    await feedback.addMessage(message);
    return await Message.findById(message.id, User);
  } catch (error) {
    throw new Error(error);
  }
};
