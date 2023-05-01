import { CryptoProvider, TrendingProvider } from '../context';
import { Logo, Nav } from '../components';
import { Outlet } from 'react-router-dom';

export default function Home () {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <main className=' w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito'>
          <div className='w-screen h-screen bg-gray-300 fixed -z-10' />
          <Logo />
          <Nav />
          <Outlet />
        </main>
      </TrendingProvider>
    </CryptoProvider>
  );
}
