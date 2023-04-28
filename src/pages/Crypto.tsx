import { Table, Filters } from '../components';
import { Outlet } from 'react-router-dom';

export default function Crypto () {
  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filters />
      <Table />
      <Outlet />
    </section>
  );
}
