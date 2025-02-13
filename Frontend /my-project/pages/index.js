import Head from 'next/head';
import Map from '../components/map';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sri Lanka Map</title>
      </Head>
      <Map />
    </div>
  );
}