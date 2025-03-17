'use client';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] });

// Creating a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C6F4E',
    },
    secondary: {
      main: '#A68B6D',
    },
    background: {
      default: '#FFFFFF', // Page background
      paper: '#D9C2A6',   // Card background
    }
  },


});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}