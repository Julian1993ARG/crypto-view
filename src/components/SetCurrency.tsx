import { useCryptoContext } from '@/context';
import submitIcon from '../assets/submit-icon.svg';
import selectIcon from '../assets/select-icon.svg';
import { symbols } from '@/models';
import { ResetIcon } from './Icons';

export default function SetCurrency () {
  const optionSorts = [
    {
      name: 'market cap desc',
      value: 'market_cap_desc'
    },
    {
      name: 'market cap asc',
      value: 'market_cap_asc'
    },
    {
      name: 'volume asc',
      value: 'volume_asc'
    },
    {
      name: 'volume desc',
      value: 'volume_desc'
    },
    {
      name: 'id asc',
      value: 'id_asc'
    },
    {
      name: 'id desc',
      value: 'id_desc'
    }
  ];

  const { setCurrency, setSortBy, resetFunction } = useCryptoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.currency.value || 'usd';
    if (value.toUpperCase() in symbols) {
      setCurrency(value);
      e.currentTarget.currency.value = '';
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSortBy(value);
  };

  return (
    <div className='flex lg:mr-7 justify-between mt-4 lg:mt-0 sm:flex-row flex-col relative'>
      <form
        className='relative flex items-center font-nunito md:mr-12 mr-1'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='currency'
          className='mr-2  sm:text-base text-sm sm:font-bold font-medium'
        >currency:
        </label>
        <input
          type='text'
          name='currency'
          placeholder='usd'
          className='w-16 rounded bg-gray-200 placeholder:text-gray-100  placeholder:text-base required outline-0  border border-transparent focus:border-cyan leading-4  sm:text-base text-sm sm:p-0 sm:pl-2 p-1 '
        />
        <button
          className='ml-1 cursor-pointer'
          type='submit'
        >
          <img src={submitIcon} alt='submit-icon' className='w-full h-auto' />
        </button>

      </form>

      <label htmlFor='sort' className='relative flex sm:justify-center justify-start items-center mt-4 sm:mt-0'>
        <span className='mr-2 sm:font-bold font-medium sm:text-base text-sm w-16'>sort by: </span>
        <select
          name='sort'
          id='sort'
          className='rounded bg-gray-200 sm:text-base text-sm pl-2 pr-10 py-1.5 focus:outline-0 text-transparent appearance-none capitalize leading-4 w-full sm:w-48 '
          onChange={handleSort}
        >
          {optionSorts.map((option, index) => (
            <option key={index} value={option.value}>{option.name}</option>
          ))}
        </select>
        <img
          src={selectIcon}
          alt='select Icon'
          className='w-[1rem] h-auto absolute right-1 top-2 pointer-events-none'
        />
      </label>
      <button className='w-[2rem] ml-4 hover:scale-110 transition-all transition-ease absolute right-0 top-0 sm:relative ' onClick={resetFunction}>
        <ResetIcon className='w-full h-full fill-cyan' />
      </button>

    </div>
  );
}
