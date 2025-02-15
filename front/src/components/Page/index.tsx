import { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="text-4xl font-semibold">{children}</h1>;
};

export const Page = {
  Title,
};
