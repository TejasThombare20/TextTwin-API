import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="pt-20 ">{children}</section>;
};

export default layout;
