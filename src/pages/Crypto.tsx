import { useCryptoContext } from '@/context';
import { Table, Filters, Pagination } from '../components';
import { Outlet } from 'react-router-dom';

export default function Crypto () {
  const { cryptoData, currency } = useCryptoContext();
  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filters />
      <Table cryptoData={cryptoData} currency={currency} />
      <div className='flex items-center justify-between mt-4 capitalize h-[2rem]'>
        <span>Data provided by <a className='text-cyan' href='https://www.coingecko.com/' target='_blank' rel='noreferrer'>CoinGecko</a></span>
        <Pagination />
      </div>
      <Outlet />
    </section>
  );
}
