import searchIcon from '@/assets/search-icon.svg';
import { useCryptoContext } from '@/context';
import { useState } from 'react';
import debounce from 'lodash.debounce';
import { Spinner } from '.';

type Prop = {
  handleSearch: (arg:string) => void
}

const SearchInput = ({ handleSearch }:Prop) => {
  const { searchData, setCoinSearch, setSearchData } = useCryptoContext();
  const [searchText, setSearchText] = useState('');

  const selectCoin = (coin: string) => {
    setCoinSearch(coin);
    setSearchText('');
    setSearchData([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  return (
    <>
      <form
        className='xl:w-96 lg:w-60 w-full relative flex items-center  lg:ml-7  font-nunito '
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='search'
          className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 placeholder:text-base required outline-0
          border border-transparent focus:border-cyan '
          placeholder='Search here...'
          value={searchText}
          onChange={handleInput}
          autoComplete='off'
        />
        <button
          type='submit'
          className='absolute right-1 cursor-pointer'
        >
          <img
            src={searchIcon}
            className='w-full h-auto'
            alt='icon'
          />
        </button>
      </form>
      {
    searchText.length > 0
      ? <ul className='absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 '>
        {
          searchData.length > 0
            ? searchData.map((coin) => (
              <li
                key={coin.id}
                className='flex items-center ml-4 my-2 cursor-pointer '
                onClick={() => selectCoin(coin.id)}
              >
                <img
                  src={coin.thumb}
                  alt='coin image'
                  className='w-[1rem] h-[1rem] mx-1.5'
                />
                <span>{coin.name}</span>
              </li>
            ))
            : <Spinner />
        }
        {/* eslint-disable-next-line react/jsx-closing-tag-location */}
      </ul>
      : null
  }
    </>
  );
};

export default function Search () {
  const { getSearchResults } = useCryptoContext();

  const debounceFunc = debounce(function (val) {
    getSearchResults(val);
  }, 2000);

  return (
    <div className='relative'>
      <SearchInput handleSearch={debounceFunc} />
    </div>
  );
}
