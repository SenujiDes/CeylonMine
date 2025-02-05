'use client';
import { Container, Typography, Paper, Grid, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

// Custom TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function EducationalPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Mining Education & Resources
      </Typography>
      
      {/* Navigation Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Licensing Guidelines" />
          <Tab label="Environmental Compliance" />
          <Tab label="Mineral Royalties" />
          <Tab label="FAQs" />
        </Tabs>

        {/* Content Sections */}
        <TabPanel value={selectedTab} index={0}>
          <Typography variant="h5" gutterBottom>
            Licensing Guidelines
          </Typography>
          <Typography paragraph>
          Welcome to the Licensing Guidelines section of CeylonMine. This guide provides essential information about obtaining, renewing, and maintaining mining licenses in Sri Lanka, along with compliance requirements and best practices for responsible mining operations.
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h5" gutterBottom>
            Environmental Compliance
          </Typography>
          <Typography paragraph>
          1. Environmental Regulation<br/>
          Mining operations in Sri Lanka are subject to the following key environmental regulations:<br/>

          Environmental Impact Assessment (EIA): Required for large-scale mining projects to evaluate potential impacts and identify mitigation measures.<br/>
          National Environmental Act (NEA): Enforces pollution control, resource conservation, and biodiversity protection.<br/>
          Water Resource Management Regulations: Protects water bodies from contamination due to mining activities.<br/> 
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h5" gutterBottom>
            Mineral Royalties
          </Typography>
          <Typography paragraph>
          Mineral royalties are payments made by mining operators to the government as compensation for the extraction of natural resources. CeylonMine simplifies the calculation, tracking, and payment of mineral royalties, ensuring compliance with Sri Lankan regulations.


          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography paragraph>
          <b>Question:</b> What types of mining licenses are available?<br/>
          <b>Answer:</b><br/>
          The available types of licenses include:<br/>

          <b>Exploration License:</b> For geological investigations.<br/>
          <b>Small-Scale Mining License:</b> For limited extraction activities.<br/>
          <b>Large-Scale Mining License:</b> For extensive and commercial mining operations.<br/>
          <b>Renewal License:</b> For extending the validity of existing licenses.<br/>

          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
}