/* eslint-disable no-useless-return */
import { useCryptoContext } from '@/context';
import paginationArrow from '../assets/pagination-arrow.svg';
import { useRef } from 'react';
import submitIcon from '../assets/submit-icon.svg';

const PerPage = () => {
  const { setPerPage } = useCryptoContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (value) {
      setPerPage(Number(value));
    }
  };
  return (
    <form
      className='relative flex items-center font-nunito sm:mr-12'
      onSubmit={handleSubmit}
    >
      <label
        htmlFor='perPage'
        className='relative flex justify-center items-center mr-2 font-bold'
      >perPage:
      </label>
      <input
        ref={inputRef}
        type='number'
        min={1}
        max={250}
        name='perPage'
        placeholder='10'
        className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2  outline-0 border focus:border-cyan leading-4 '
      />
      <button
        className='ml-1 cursor-pointer'
        type='submit'
      >
        <img src={submitIcon} alt='submit-icon' className='w-full h-auto' />
      </button>

    </form>
  );
};

export default function Pagination () {
  const { page: currentPage, setPage: setCurrentPage, totalPages: totalNumber, cryptoData, perPage } = useCryptoContext();

  const next = () => {
    if (currentPage === totalNumber) return;
    else setCurrentPage(currentPage + 1);
  };
  const prev = () => {
    if (currentPage === 0) return;
    else if (currentPage === 1) return;
    else setCurrentPage(currentPage - 1);
  };

  const multiStepNext = () => {
    if (currentPage + 3 >= totalNumber) return;
    else setCurrentPage(currentPage + 3);
  };

  const multiStepPrev = () => {
    if (currentPage - 3 < 1) return;
    else setCurrentPage(currentPage - 3);
  };
  return (
    <div className={`flex md:flex-row flex-col items-center md:mt-0 mt-4  ${cryptoData.length < perPage && 'hidden'}`}>
      <PerPage />
      <ul className='flex items-center justify-end text-sm'>
        <li className='flex items-center'>

          <button onClick={prev} className='outline-0 hover:text-cyan w-8'>
            <img className='w-full h-auto rotate-180' src={paginationArrow} alt='left' />
          </button>
        </li>
        <li><button onClick={multiStepPrev} className={`outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg ${currentPage - 3 < 1 && 'hidden'}`}>...</button></li>

        <li><button onClick={prev} className={`outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center  bg-gray-200 mx-1.5 ${currentPage - 1 < 1 && 'hidden'}`}>{currentPage - 1}</button></li>

        <li><button disabled className='outline-0 rounded-full w-8 h-8 flex items-center justify-center  bg-cyan text-gray-300 mx-1.5'>{currentPage}</button></li>

        <li><button onClick={next} className={`outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center  bg-gray-200 mx-1.5 ${currentPage === totalNumber && 'hidden'}`}>{currentPage + 1}</button></li>

        <li><button onClick={multiStepNext} className={`outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg ${currentPage === totalNumber && 'hidden'}`}>...</button></li>

        <li><button onClick={() => setCurrentPage(totalNumber)} className={`outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5 ${currentPage === totalNumber && 'hidden'}`}>{totalNumber}</button></li>

        <li>
          <button onClick={next}>
            <img className='w-full h-auto' src={paginationArrow} alt='right' />
          </button>
        </li>
      </ul>
    </div>
  );
}
