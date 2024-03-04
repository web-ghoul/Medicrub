import { Tab, Tabs, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TabsContext } from '../../context/TabsContext';
import Forms from '../../forms/Forms';
import { PrimaryBox } from '../../mui/PrimaryBox';
import NearestDriversTable from '../../tables/NearestDriversTable/NearestDriversTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className='w-[100%] bg-gray p-6 rounded-lg md:p-4 sm:!p-2'
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AddTripTab = () => {
  const { addTripTab, setAddTripTab } = useContext(TabsContext);
  const mdScreen = useMediaQuery("(max-width:992px)")

  const handleChange = (event, newValue) => {
    setAddTripTab(newValue);
  };

  const tabStart = { textAlign: "start", alignItems: "flex-start", justifyContent: "flex-start" }
  return (
    <PrimaryBox
      className={`!h-[100%] !w-[100%] !grid justify-between items-start gap-40 grid-cols-[auto,1fr] lg:gap-20  md:grid-cols-1 md:!gap-10`}
      sx={{ bgcolor: 'background.paper', display: 'flex', "& span.css-1wynwom-MuiTabs-indicator": { left: '0', width: "6px", borderRadius: "10px", } }}
    >
      <Tabs
        orientation={mdScreen ? "horizontal" : "vertical"}
        variant="scrollable"
        value={addTripTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ "& div": { gap: { "xl": "30px", "md": "10px" }, flexWrap: "wrap" } }}
        className='sticky top-[100px] md:relative md:top-auto md:m-auto '
      >
        <Tab sx={tabStart} disabled label="Trip Details" {...a11yProps(0)} />
        <Tab sx={tabStart} disabled label="Assign Driver" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={addTripTab} index={0}>
        <Forms type={"trip_details"} />
      </TabPanel>
      <TabPanel value={addTripTab} index={1}>
        <NearestDriversTable />
      </TabPanel>
    </PrimaryBox>
  )
}

export default AddTripTab