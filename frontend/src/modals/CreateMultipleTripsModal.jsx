import { Box, Modal } from "@mui/material"
import { useContext } from "react"
import { ModalsContext } from "../context/ModalsContext"
import Forms from "../forms/Forms"

const CreateMultipleTripsModal = () => {
  const { openCreateMultipleTripsModal, handleCloseCreateMultipleTripsModal } = useContext(ModalsContext)

  return (
    <Modal
      open={openCreateMultipleTripsModal}
      onClose={handleCloseCreateMultipleTripsModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      data-test={"verify-driver-modal"}
    >
      <Box className={`bg-white absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] max-w-[90vw] max-h-[90vh] w-max rounded-lg overflow-auto`}>
        <Box className={`p-6 w-full h-fit`}>
          <Forms type={"create_multiple_trips"} />
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateMultipleTripsModal