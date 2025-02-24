'use client';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Box 
} from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'Educational Resources',
      description: 'Access comprehensive information about mining regulations, licensing procedures, and environmental responsibilities.',
      link: '/education'
    },
    {
      title: 'License Applications',
      description: 'Apply for mining licenses and track your application status.',
      link: '/licenses'
    },
    {
      title: 'Environmental Compliance',
      description: 'Learn about environmental regulations and compliance requirements.',
      link: '/environment'
    },
    {
      title: 'Support & Help',
      description: 'Get assistance with any questions or concerns about mining operations.',
      link: '/support'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to GSMB Portal
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your comprehensive resource for mining operations in Sri Lanka
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={feature.link} style={{ textDecoration: 'none' }}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}