import searchIcon from '@/assets/search-icon.svg';

export default function Search () {
  return (
    <form className='w-96 relative flex items-center ml-7 font-nunito '>
      <input
        type='text'
        name='search'
        className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 outline-0 border
        focus:border-cyan '
        placeholder='Search here...'
      />
      <button
        type='submit'
        className='absoulte right-1 cursor-pointer'
      >
        <img
          src={searchIcon}
          className='w-full h-auto'
          alt='icon'
        />
      </button>
    </form>
  );
}
