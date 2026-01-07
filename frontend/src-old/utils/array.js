/**
 * Sort messages by id to display from earliest to latest
 */
export const sortMessages = (messages) => {
  return messages.sort((obj1, obj2) => {
    return obj1.id > obj2.id ? 1 : -1;
  });
};
