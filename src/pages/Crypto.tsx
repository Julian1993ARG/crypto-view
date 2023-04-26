import { Table, Filters } from '../components';

export default function Crypto () {
  return (
    <section className='w-[80%] h-full flex flex-col mt-16 mb-24 relative'>
      <Filters />
      <Table />
    </section>
  );
}
