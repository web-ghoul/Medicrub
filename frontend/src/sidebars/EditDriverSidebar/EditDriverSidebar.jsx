import { Drawer } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Forms from '../../forms/Forms';

const EditDriverSidebar = () => {
  const { openEditDriverDrawer, handleCloseEditDriverDrawer } = useContext(AppContext)

  return (
    <Drawer
      anchor={"right"}
      open={openEditDriverDrawer}
      onClose={handleCloseEditDriverDrawer}
      sx={{ zIndex: 2500 }}
    >
      <Forms type={"edit_driver"} />
    </Drawer>
  )
}

export default EditDriverSidebar