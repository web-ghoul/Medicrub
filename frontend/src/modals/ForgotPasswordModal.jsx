import { Box, Modal } from "@mui/material"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import Forms from "../forms/Forms"

const ForgotPasswordModal = () => {
  const { openForgotPasswordModal, handleCloseForgotPasswordModal } = useContext(AppContext)
  return (
    <Modal
      open={openForgotPasswordModal}
      onClose={handleCloseForgotPasswordModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`bg-white p-6 absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-stretch items-center max-w-[90vw] max-h-[90vh] w-max rounded-lg overflow-auto`}>
        <Forms type={"forgot_password"} />
      </Box>
    </Modal>
  )
}

export default ForgotPasswordModal