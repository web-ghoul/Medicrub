import { UploadFile } from "@mui/icons-material"
import { Box, Modal, Typography } from "@mui/material"
import { useContext } from "react"
import UploadSheet from "../components/UploadSheet/UploadSheet"
import { AppContext } from "../context/AppContext"

const UploadSheetModal = () => {
  const { openUploadSheetModal, handleCloseUploadSheetModal } = useContext(AppContext)
  return (
    <Modal
      open={openUploadSheetModal}
      onClose={handleCloseUploadSheetModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`bg-white p-6 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-stretch items-center max-w-[90vw] max-h-[90vh] w-[50vw] md:w-[75vw] sm:!w-[90vw] rounded-lg overflow-auto`}>
        <Box className={`grid justify-stretch items-center gap-4 w-full`}>
          <Box className={`flex justify-center items-center gap-1`}>
            <UploadFile sx={{ color: (theme) => theme.palette.common.excel, fontSize: { "lg": "30px" } }} />
            <Typography variant="h3" className="font-[600]">Upload Sheet</Typography>
          </Box>
          <UploadSheet />
        </Box>
      </Box>
    </Modal>
  )
}

export default UploadSheetModal