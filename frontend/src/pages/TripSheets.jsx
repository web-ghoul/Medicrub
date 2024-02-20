import { Box } from "@mui/material"
import { useContext } from "react"
import TripsSheetsAccordion from "../accordions/TripSheetAccordion"
import NoData from "../components/NoData/NoData"
import UploadSheet from "../components/UploadSheet/UploadSheet"
import { AppContext } from "../context/AppContext"
import { PrimaryBox } from "../mui/PrimaryBox"
import { PrimaryContainer } from "../mui/PrimaryContainer"

const TripSheets = () => {
  const { tripsSheets } = useContext(AppContext)

  return (
    <PrimaryBox>
      <PrimaryContainer className="!grid justify-stretch items-center gap-8">
        <UploadSheet />
        <Box className={`grid justify-stretch items-center`}>
          {tripsSheets && tripsSheets.length > 0 ? (
            <Box className={`grid justify-stretch items-center gap-4`}>
              {tripsSheets.map((trip, i) => (
                <TripsSheetsAccordion key={i} data={trip} />
              ))}
            </Box>
          ) : (
            <NoData com={"section"} img={"/images/folder.png"} title={"No trips yet..."} />
          )}
        </Box>
      </PrimaryContainer>
    </PrimaryBox>
  )
}

export default TripSheets