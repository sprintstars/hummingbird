// types
import type { FunctionComponent } from "react";

type DetailsLayoutProps = {
  children: React.ReactNode;
};

const DetailsLayout: FunctionComponent<DetailsLayoutProps> = ({ children }) => {
  return <main className="flex-[2] flex flex-col h-full rounded-md">{children}</main>;
};

export default DetailsLayout;
