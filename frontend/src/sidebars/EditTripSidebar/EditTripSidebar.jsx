import { Drawer } from '@mui/material';
import { useContext } from 'react';
import { DrawersContext } from '../../context/DrawersContext';
import Forms from '../../forms/Forms';

const EditTripSidebar = () => {
  const { openEditTripDrawer, handleCloseEditTripDrawer } = useContext(DrawersContext)

  return (
    <Drawer
      anchor={"right"}
      open={openEditTripDrawer}
      onClose={handleCloseEditTripDrawer}
      sx={{ zIndex: 2500 }}
    >
      <Forms type={"edit_trip"} />
    </Drawer>
  )
}

export default EditTripSidebar