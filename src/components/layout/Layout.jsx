import React from "react";
import UserStats from "./UserStats";
import Navigation from "./Navigation";

const Layout = ({ children, refetch }) => {
  return (
    <div className="pt-[50px] pb-[150px]">
      <UserStats refetchUserData={refetch} />
      {children}
      <Navigation />
    </div>
  );
};

export default Layout;
