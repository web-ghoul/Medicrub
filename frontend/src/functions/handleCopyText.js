import { handleAlert } from "./handleAlert";

export const handleCopyText=(text)=> {
  navigator.clipboard.writeText(
    text
  );
  handleAlert({ msg: `Copied ${text}`, status: "success" })
}