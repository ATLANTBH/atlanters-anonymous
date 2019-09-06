export const removeSpaces = string => {
  return string.replace(/ /g, "");
};

export const validateInputMessage = message => {
  if (message.length > 1000)
    return "Messages greater than 1000 characters are not allowed";
  return null;
};

export const getHostnameWithProtocol = ({ location }) => {
  const { protocol, host } = location;
  return protocol + "//" + host;
};
