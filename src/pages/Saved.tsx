import { ResetIcon, Table } from '@/components';
import { useCryptoContext, useStorageContext } from '@/context';
import { Outlet } from 'react-router-dom';

export default function SavedCoins () {
  const { savedData, getLastSavedData } = useStorageContext();
  const { currency } = useCryptoContext();
  return (
    <section className='w-[80%] h-full flex flex-col mt-6 mb-24 relative '>
      {
        savedData.length > 0
          ? <Table cryptoData={savedData} currency={currency} />
          : <h1 className='text-center text-2xl text-cyan'>No saved coins</h1>
      }
      <button onClick={() => getLastSavedData()} className='absolute right-2 -top-4 w-10'>
        <ResetIcon className='fill-cyan w-full h-auto ' />
      </button>
      <Outlet />
    </section>
  );
}
