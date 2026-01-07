import React from "react";
import { Redirect } from "react-router-dom";

/**
 * Redirects to target route
 * @param {String} target redirect destination
 */
export const redirect = (target) => {
  return <Redirect to={target} />;
};

/**
 * Redirects to target window
 * @param {String} target window location
 */
export const newWindowLocation = (target) => {
  window.location = target;
};
