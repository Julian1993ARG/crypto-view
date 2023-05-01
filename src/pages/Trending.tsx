import { useTrendingContext } from '@/context';
import { TrendigCard } from '@/components';
import { Outlet } from 'react-router-dom';
import { ResetIcon } from '../components/Icons';

export default function Trending () {
  const { cryptosData, resetTrendingResult } = useTrendingContext();
  return (
    <section className='w-[80%] h-full flex flex-col mt-6 mb-24 relative '>
      <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-9 border border-gray-100 rounded'>
        {cryptosData.map((crypto, index) => (
          <TrendigCard key={index} crypto={crypto.item} />
        ))}
      </div>
      <button onClick={() => resetTrendingResult()} className='absolute right-2 -top-4 w-10'>
        <ResetIcon className='fill-cyan w-full h-auto ' />
      </button>
      <Outlet />
    </section>
  );
}
