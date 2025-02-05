'use client';
import Link from 'next/link';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2
      }}
    >
      <Typography variant="h3" component="h1">
        Mining Information Portal
      </Typography>
      <Link href="/education" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Go to Educational Resources
        </Button>
      </Link>
    </Container>
  );
}