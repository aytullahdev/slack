import React from "react";
type workspaceProps = {
  params: {
    workspaceId: string;
  };
};
const WorkspacePage = ({ params }: workspaceProps) => {
  return <div>{params.workspaceId}</div>;
};

export default WorkspacePage;
