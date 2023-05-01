import { useTrendingContext } from '@/context';
import { TrendigCard } from '@/components';

export default function Trending () {
  const { cryptosData } = useTrendingContext();
  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative '>
      <div className='w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-9 border border-gray-100 rounded'>
        {cryptosData.map((crypto, index) => (
          <TrendigCard key={index} crypto={crypto.item} />
        ))}
      </div>
    </section>
  );
}
