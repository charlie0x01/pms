import React from "react";
import FlexCard from "./FlexCard";
import { useState } from "react";

import { Drawer, Button } from "antd";

const DrawerPage = ({
  buttonChildren,
  buttonStyle,
  buttonType,
  children,
  drawerChildren,
  drawerTitle,
  drawerStyle,
  isOpen,
  setIsOpen,
  onClose,
}) => {
  return (
    <>
      <FlexCard>
        <Button
          type={buttonType}
          style={buttonStyle}
          onClick={() => setIsOpen(true)}
        >
          <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            {buttonChildren}
          </div>
        </Button>
        {children}
      </FlexCard>
      <Drawer
        style={drawerStyle}
        title={drawerTitle}
        open={isOpen}
        closable
        onClose={onClose}
      >
        {drawerChildren}
      </Drawer>
    </>
  );
};
export default DrawerPage;
