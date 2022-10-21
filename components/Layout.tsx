import React, { FC, ReactElement } from "react";
import Footer from "./Footer";
import TopNav from "./TopNav";

interface Props {
  children: ReactElement;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
};

export default Layout;
