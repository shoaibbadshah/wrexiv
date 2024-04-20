"use client";

import { useMeQuery } from "@/graphql/generated";

const Playground = () => {
  const { data } = useMeQuery();
  console.log(data);
  return <div>hogehoge</div>;
};

export default Playground;
