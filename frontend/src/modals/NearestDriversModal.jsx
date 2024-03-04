import { Box, Modal, Typography } from "@mui/material"
import { useContext } from "react"
import { ModalsContext } from "../context/ModalsContext"
import NearestDriversTable from "../tables/NearestDriversTable/NearestDriversTable"

const NearestDriversModal = () => {
  const { openNearestDriversModal, handleCloseNearestDriversModal } = useContext(ModalsContext)
  return (
    <Modal
      open={openNearestDriversModal}
      onClose={handleCloseNearestDriversModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-test={"nearest-drivers-modal"}
    >
      <Box className={`bg-white absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-[90vw] max-h-[90vh] rounded-lg overflow-auto`}>
        <Box className={`p-6 w-full h-fit grid justify-stretch items-center gap-4`}>
          <Typography variant={"h3"} className="font-[600] text-center">Assign Driver</Typography>
          <NearestDriversTable />
        </Box>
      </Box>
    </Modal>
  )
}

export default NearestDriversModal