import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Divider } from '@mui/material';
import { PeopleAltRounded, CommuteRounded, PendingActionsRounded, MonetizationOnRounded } from '@mui/icons-material';
import axios from 'axios';
import { getApiUrl } from '../functions/getApiUrl';
import Cookies from 'js-cookie';
import DriversLocation from '../components/DriversLocation/DriversLocation';
import { PrimaryBox } from '../mui/PrimaryBox';
import { PrimaryContainer } from '../mui/PrimaryContainer';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', borderRadius: '16px' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ 
        backgroundColor: `${color}15`, 
        color: color, 
        p: 1.5, 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary" fontWeight="500">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="700">
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = Cookies.get(process.env.REACT_APP_TOKEN_NAME);
        const res = await axios.get(getApiUrl('/DashboardStats'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return null;

  return (
    <PrimaryBox>
      <PrimaryContainer className="!flex flex-col gap-6">
        <Typography variant="h4" fontWeight="700" sx={{ mb: 2 }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Verified Drivers" 
              value={stats?.totalDrivers || 0} 
              icon={<PeopleAltRounded />} 
              color="#2e7d32" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Pending Drivers" 
              value={stats?.pendingDrivers || 0} 
              icon={<PendingActionsRounded />} 
              color="#ed6c02" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Trips Today" 
              value={stats?.totalTripsToday || 0} 
              icon={<CommuteRounded />} 
              color="#0288d1" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Income Today" 
              value={`$${stats?.incomeToday || 0}`} 
              icon={<MonetizationOnRounded />} 
              color="#9c27b0" 
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="600">Active Drivers Map</Typography>
              </Box>
              <Box sx={{ flexGrow: 1, minHeight: '500px' }}>
                <DriversLocation />
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%', borderRadius: '16px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                <Typography variant="h6" fontWeight="600">Recent Trips</Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                {stats?.recentTrips?.length > 0 ? (
                  stats.recentTrips.map((trip, index) => (
                    <React.Fragment key={trip._id}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" fontWeight="600">
                          {trip.patient?.firstName} {trip.patient?.lastName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" display="block">
                          {trip.date} at {trip.time}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: '500' }}>
                            {trip.driver?.user?.firstName} {trip.driver?.user?.lastName}
                          </Typography>
                          <Typography variant="body2" fontWeight="700">${trip.cost}</Typography>
                        </Box>
                      </Box>
                      {index < stats.recentTrips.length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="textSecondary">No recent trips found</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PrimaryContainer>
    </PrimaryBox>
  );
};

export default Dashboard;
