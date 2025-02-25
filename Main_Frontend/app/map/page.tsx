import Head from 'next/head';
import Map from '../components/map.jsx';
import Navbar from '../navbar/page';
// _app.js or index.js
//import '../styles/global.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
      <Head>
        <title>Sri Lanka Map</title>
      </Head>
      <Navbar />
      <Map />
    </div>
  );
}