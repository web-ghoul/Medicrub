import { Box, Modal, Typography } from "@mui/material"
import { useContext } from "react"
import { ModalsContext } from "../context/ModalsContext"
import Forms from "../forms/Forms"
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
      <Box className={`bg-white absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-[90vw] max-h-[90vh] rounded-lg overflow-auto w-[50vw] md:w-[75vw] sm:!w-max`}>
        <Box className={`p-6 w-full h-fit grid justify-stretch items-center gap-4`}>
          <Typography variant={"h3"} className="font-[600] text-center">Assign Driver</Typography>
          <Box className={`grid justify-stretch items-center gap-3`}>
            <Forms type={"search_for_nearest_driver"} />
            <NearestDriversTable />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default NearestDriversModal