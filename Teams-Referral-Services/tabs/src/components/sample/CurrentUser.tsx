import React from "react";

export function CurrentUser(props: { userName?: string }) {
  const { userName } = {
    userName: "",
    ...props,
  };
  return (
    <div>
      <p>Fill the following information of the candidate.</p>
    </div>
  );
}
