import { MESSAGE_LENGTH } from "../constants/strings";

export const removeSpaces = string => {
  return string.replace(/ /g, "");
};

export const validateInputMessage = message => {
  if (message.length > MESSAGE_LENGTH)
    return `Messages greater than ${MESSAGE_LENGTH} characters are not allowed`;
  return null;
};

export const getHostnameWithProtocol = ({ location }) => {
  const { protocol, host } = location;
  return protocol + "//" + host;
};
