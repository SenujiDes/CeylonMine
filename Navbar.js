'use client';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GSMB Portal
        </Typography>
        <Box>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button 
              color="inherit"
              sx={{ color: pathname === '/' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              Home
            </Button>
          </Link>
          <Link href="/education" style={{ textDecoration: 'none' }}>
            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              Education
            </Button>
          </Link>
          {/* Add more navigation links as needed */}
          
          <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              Map
            </Button>

            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              Sign Up
            </Button>

            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              License Portal
            </Button>

            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              User Dashboard
            </Button>

            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              ChatBot
            </Button>

            <Button 
              color="inherit"
              sx={{ color: pathname === '/education' ? '#fff' : 'rgba(255,255,255,0.7)' }}
            >
              Customer Support
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}