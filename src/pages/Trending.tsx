import { useTrendingContext } from '@/context';
import { TrendigCard } from '@/components';
import { Outlet } from 'react-router-dom';
import { ResetIcon } from '../components/Icons';

export default function Trending () {
  const { cryptosData, resetTrendingResult } = useTrendingContext();
  return (
    <section className='lg:w-[80%] w-[90%] h-full flex flex-col  mb-24 mt-16 relative'>
      <div className='w-full flex lg:flex-row flex-col items-center flex-wrap justify-evenly py-8 border border-gray-100 rounded min-h-[60vh] '>
        {cryptosData.map((crypto, index) => (
          <TrendigCard key={index} crypto={crypto.item} />
        ))}
      </div>
      <button onClick={() => resetTrendingResult()} className='w-[2rem] ml-4 hover:scale-110 transition-all transition-ease absolute right-0 -top-10  '>
        <ResetIcon className='fill-cyan w-full h-auto ' />
      </button>
      <Outlet />
    </section>
  );
}
