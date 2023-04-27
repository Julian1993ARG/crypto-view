import { Search, SetCurrency } from '.';

export default function Filters () {
  return (
    <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex items-center justify-between relative '>

      <Search />
      <SetCurrency />
    </div>
  );
}
