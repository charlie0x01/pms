import { Button, Drawer } from "antd";
import { useState } from "react";
const ButtonWithDrawer = ({ drawerChildren, buttonChildren, drawerTitle, buttonStyles }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="dashed" onClick={showDrawer} style={buttonStyles}>
        <div className="is-flex is-flex-direction-column is-align-content-center">{buttonChildren}</div>
      </Button>
      <Drawer
        title={drawerTitle}
        placement="right"
        onClose={onClose}
        open={open}
      >
        {drawerChildren}
      </Drawer>
    </>
  );
};
export default ButtonWithDrawer;
