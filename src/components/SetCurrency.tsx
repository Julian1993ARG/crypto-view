import { useCryptoContext } from '@/context';
import submitIcon from '../assets/submit-icon.svg';

export default function SetCurrency () {
  const { setCurrency } = useCryptoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = e.currentTarget.currency.value as string || 'usd';
    setCurrency(value);
    e.currentTarget.currency.value = '';
  };

  return (
    <div className='flex mr-7'>
      <form
        className='relative flex items-center font-nunito mr-12'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='currency'
          className='relative flex justify-center items-center mr-2 font-bold'
        >currency:
        </label>
        <input
          type='text'
          name='currency'
          placeholder='usd'
          className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2  outline-0 border focus:border-cyan leading-4 '
        />
        <button
          className='ml-1 cursor-pointer'
          type='submit'
        >
          <img src={submitIcon} alt='submit-icon' className='w-full h-auto' />
        </button>
      </form>

    </div>
  );
}
