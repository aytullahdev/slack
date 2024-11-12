import React from "react";

const page = ({
  params: { channelId },
}: {
  params: {
    channelId: string;
  };
}) => {
  return <div>{channelId}</div>;
};

export default page;
