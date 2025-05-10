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
          <Tab label="License Categories" />
          <Tab label="Licensing Process" />
        </Tabs>

        {/* Content Sections */}
        <TabPanel value={selectedTab} index={0}>
          <Typography variant="h5" gutterBottom>
            Licensing Guidelines
          </Typography>
          <Typography paragraph>
            Welcome to the Licensing Guidelines section of CeylonMine. This guide provides essential information about obtaining, renewing, and maintaining mining licenses in Sri Lanka, along with compliance requirements and best practices for responsible mining operations.
          </Typography>
          <Typography paragraph>
            Under the Mines and Minerals Act, No. 33 of 1992 amended as Mines and Minerals (Amendment) Act, No. 66 of 2009 and its regulations, the GSMB issues licenses, viz. Exploration, Mining for minerals, Transport, Process, Store, Trade-in and Export. Details of these licenses are as follows:
          </Typography>
          <Typography paragraph>
            As per Section 29 of the principal enactment read with Section 11(2) of the Amendment, the following are NOT eligible to apply:
          </Typography>
          <Typography paragraph>
            <b>An individual who:</b><br/>
            - Is under the age of 18 years;<br/>
            - Is a public officer or employee of any provincial council or local authority;<br/>
            - Is, under any law enforceable in Sri Lanka, declared to be of unsound mind;<br/>
            - Is a person, having been declared an insolvent or a bankrupt under any law enforceable in Sri Lanka or in any other country, is an undischarged insolvent or bankrupt;<br/>
            - Is a member of the parliament or a member of a provincial council or a member of a local Authority.<br/>
          </Typography>
          <Typography paragraph>
            <b>A company which:</b><br/>
            - Is not registered to do business in Sri Lanka;<br/>
            - Is declared to be bankrupt or in liquidation.<br/>
          </Typography>
          <Typography paragraph>
            <b>A firm which:</b><br/>
            - Is not registered to do business in Sri Lanka;<br/>
            - Is declared to be bankrupt or in liquidation.<br/>
          </Typography>
          <Typography paragraph>
            <b>Additionally, any applicant who:</b><br/>
            - Does not possess the financial capacity and technical qualifications necessary in the opinion of the bureau to conduct the activities in respect of which the license has been applied for;<br/>
            - Fails to pay the prescribed fee for the issue of the license.<br/>
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h5" gutterBottom>
            
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
            
            Mineral royalties are payments made by mining operators to the government as compensation for the extraction of natural resources. CeylonMine simplifies the calculation, tracking, and payment of mineral royalties, ensuring compliance with Sri Lankan regulations.<br/>

            Mineral royalties are typically calculated based on:
            The amount of water gel, Ammonium Nitrate (NH4NO3), and the Powder Factor<br/>
            
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

          <b>1. Exploration License (EL)</b><br/>
          <b>2. Mining Licenses</b><br/>
          <b>3. Trading License (TDL)</b><br/>
          <b>4. Transport License (TL)</b><br/>
          <b>5. Export of Minerals</b><br/>
          
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={4}>
          <Typography variant="h5" gutterBottom>
            Licensing Categories
          </Typography>
          <Typography paragraph>
          <b>1. Exploration License (EL)</b><br/>
          <b>2. Mining Licenses</b><br/>
          <b>3. Trading License (TDL)</b><br/>
          <b>4. Transport License (TL)</b><br/>
          <b>5. Export of Minerals</b><br/>
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={5}>
        <Typography variant="h5" gutterBottom>
            Issuarance of license
          </Typography>
          <Typography paragraph>
          <b> Inspection of the site and suggestions: </b><br/>
          
      
          A site engineer is assigned by GSMB to examine the proposed mining location following the submission of an application. The engineer evaluates a number of factors, including the land's suitability for mining and any possible environmental effects. Additionally, the engineer could suggest other reports or clearances that the applicant requires to get the following documents;<br/>
          1. Central Environment Authority (CEA) Environmental Report:- <br/>
          To ensure that local ecosystems won't be harmed by the proposed mining. <br/>
          
          2. Landowners' Consent:- <br/>
          To verify the landowners' permission for the mining operations.<br/>
          
          3. Grama Niladhari and Police Reports:- <br/>
          These reports help in confirming the applicant's background and ensuring support from the local community. <br/>
          
          4. Water Board and UDA approvals:- <br/>
          To ensure that plans for urban growth and water resources won't be impacted by the mining operation.<br/>
              
          5. Detailed Site Map:- <br/>
          Provides a map layout of the mining site for review. <br/><br/>

          <b> Screening for Eligibility: </b><br/>
          There are restrictions on those who can apply for a mining license. To verify compliance with rules, GSMB runs background checks on applicants. For example, certain individuals may not be eligible for a license, such as government officials, those in financial instability, or people with a history of non-compliance. In order to preserve these ecosystems, licenses are also not issued in protected places like livestock reserves or historical landmarks.<br/>
          
          <br/><b> Approval and Issuance: </b><br/>
          The license can be issued after every document has been reviewed and the required approvals have been secured. However, because each step is done manually and communication between sub-offices and the head office is delayed, applicants frequently have to visit the GSMB office more than once. Due to this drawn-out procedure and the absence of a centralized database, applicants experience significant delays and find it challenging to follow their applications.<br/>

        
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
}
