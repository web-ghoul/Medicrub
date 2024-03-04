import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ModalsContext } from '../context/ModalsContext'
import { PrimaryButton } from '../mui/PrimaryButton'
import TripsTable from '../tables/TripsTable/TripsTable'

const TripsSheetsAccordion = ({ data }) => {
  const { handleOpenCreateMultipleTripsModal } = useContext(ModalsContext)
  const { setTrips } = useContext(AppContext)

  const handleCreateTrips = () => {
    setTrips(data)
    handleOpenCreateMultipleTripsModal()
  }

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <Typography variant='h6' className='font-[600]'>{data.fileName}</Typography>
      </AccordionSummary>
      <AccordionDetails className='grid justify-stretch items-center gap-4'>
        <TripsTable sheet={true} data={data.trips} name={"trips_sheet"} />
        <PrimaryButton fullWidth onClick={handleCreateTrips}>Create</PrimaryButton>
      </AccordionDetails>
    </Accordion>
  )
}

export default TripsSheetsAccordion