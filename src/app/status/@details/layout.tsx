// types
import type { FunctionComponent } from "react";

type DetailsLayoutProps = {
  children: React.ReactNode;
};

const DetailsLayout: FunctionComponent<DetailsLayoutProps> = ({ children }) => {
  return <main className="flex-[2] flex flex-col rounded-md">{children}</main>;
};

export default DetailsLayout;
