import React from "react";

export function EditCode(props: { tabCodeEntry?: string }) {
  const { tabCodeEntry } = {
    tabCodeEntry: "tabs/src/index.tsx",
    ...props,
  };
  return (
    <div>
      <h2>Refer a friend or family :</h2>
    </div>
  );
}
