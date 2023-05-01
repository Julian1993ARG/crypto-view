import { Search, SetCurrency } from '.';

export default function Filters () {
  return (
    <div className=' w-full lg:h-12 h-full border-2 rounded-lg border-solid border-gray-100  flex lg:flex-row flex-col lg:items-center lg:justify-between relative align-start justify-between p-2 lg:p-0  '>

      <Search />
      <SetCurrency />
    </div>
  );
}
