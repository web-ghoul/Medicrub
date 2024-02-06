import { Tab, Tabs, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Forms from '../../forms/Forms';
import { PrimaryBox } from '../../mui/PrimaryBox';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className='w-[100%] bg-gray p-6 rounded-lg md:p-4'
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

const AddDriverTab = () => {
  const { addDriverTab, setAddDriverTab } = useContext(AppContext);
  const mdScreen = useMediaQuery("(max-width:992px)")
  const smScreen = useMediaQuery("(max-width:768px)")

  const handleChange = (event, newValue) => {
    setAddDriverTab(newValue);
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
        value={addDriverTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ "& div": { gap: { "xl": "30px", "md": "10px" }, flexWrap: "wrap" } }}
        className='sticky top-[100px] md:relative md:top-auto md:m-auto '
      >
        {smScreen ? <Tab sx={tabStart} label="Personal" {...a11yProps(0)} /> : <Tab sx={tabStart} label="Personal Data" {...a11yProps(0)} />}
        {smScreen ? <Tab sx={tabStart} label="License" {...a11yProps(1)} /> : <Tab sx={tabStart} label="Add License" {...a11yProps(1)} />}
        {smScreen ? <Tab sx={tabStart} label="Add Car" {...a11yProps(2)} /> : <Tab sx={tabStart} label="Add Car Information" {...a11yProps(2)} />}
      </Tabs>
      <TabPanel value={addDriverTab} index={0}>
        <Forms type={"personal_data"} />
      </TabPanel>
      <TabPanel value={addDriverTab} index={1}>
        <Forms type={"license"} />
      </TabPanel>
      <TabPanel value={addDriverTab} index={2}>
        <Forms type={"car_info"} />
      </TabPanel>
    </PrimaryBox>
  )
}

export default AddDriverTab