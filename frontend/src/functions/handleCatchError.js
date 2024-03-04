import { handleAlert } from "./handleAlert"

export const handleCatchError = (err) => {
  try {
    handleAlert({ msg: err.response.data.message, status: "error" })
  } catch (err) {
    handleAlert({
      msg: err.message, status: "error"
    })
  }
}