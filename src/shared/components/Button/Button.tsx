import React from "react";

export function Button({ children, ...props }) {
  return React.createElement("button", Object.assign({}, props), children);
}
