import { createContext, useState } from "react";

export const UploadImagesContext = createContext()

const UploadImagesProvider = ({children}) => {
  const [profile,setProfile] = useState(null)
  
  const [nationalFront,setNationalFront] = useState(null)

  const [nationalBack,setNationalBack] = useState(null)

  const [registration,setRegistration] = useState(null)

  const [insurance,setInsurance] = useState(null)

  const [front,setFront] = useState(null)

  const [back,setBack] = useState(null)

  const [right,setRight] = useState(null)

  const [left,setLeft] = useState(null)

  const values= {
    profile,
    setProfile,
    nationalFront,
    setNationalFront,
    nationalBack,
    setNationalBack,
    registration,
    setRegistration,
    insurance,
    setInsurance,
    front,
    setFront,
    back,
    setBack,
    right,
    setRight,
    left,
    setLeft
  }

  return (
    <UploadImagesContext.Provider value={values}>
      {children}
    </UploadImagesContext.Provider>
  )
}

export default UploadImagesProvider