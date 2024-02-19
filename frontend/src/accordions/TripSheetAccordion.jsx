import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import TripsTable from '../tables/TripsTable/TripsTable'

const TripsSheetsAccordion = ({ data }) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <Typography variant='h6' className='font-[600]'>{data.fileName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TripsTable readOnly={true} data={data.trips} />
      </AccordionDetails>
    </Accordion>
  )
}

export default TripsSheetsAccordion