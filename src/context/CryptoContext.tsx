import { ICoin, ICryptoData } from '@/models';
import { createContext, useState, useContext, useLayoutEffect, Dispatch } from 'react';

interface IContextProps{
  cryptoData: ICryptoData[],
  searchData: ICoin[],
  currency: string,
  sortBy: string,
  page: number,
  totalPages: number,
  perPage: number,
  getSearchResults: (query:string) => void,
  setCoinSearch: Dispatch<React.SetStateAction<string>>,
  setSearchData: Dispatch<React.SetStateAction<never[]>>,
  setCurrency: Dispatch<React.SetStateAction<string>>,
  setSortBy: Dispatch<React.SetStateAction<string>>,
  setPage: Dispatch<React.SetStateAction<number>>,
  resetFunction: () => void,
  setPerPage: Dispatch<React.SetStateAction<number>>
}

type Props = {
  children: React.ReactNode;
};

const CryptoContext = createContext<IContextProps>({
  cryptoData: [],
  searchData: [],
  currency: 'usd',
  sortBy: 'market_cap_desc',
  page: 1,
  totalPages: 1,
  perPage: 10,
  getSearchResults: () => null,
  setCoinSearch: () => null,
  setSearchData: () => null,
  setCurrency: () => null,
  setSortBy: () => null,
  setPage: () => null,
  resetFunction: () => null,
  setPerPage: () => null
});

export const CryptoProvider = ({ children }:Props) => {
  // Get all the data from the API
  const [cryptoData, setCryptoData] = useState([]);
  // Searched data from the API
  const [searchData, setSearchData] = useState([]);
  // Search input value
  const [coinSearch, setCoinSearch] = useState('');
  // Currency value
  const [currency, setCurrency] = useState('usd');
  // Order value
  const [sortBy, setSortBy] = useState('market_cap_desc');
  // Pages
  const [page, setPage] = useState(1);
  // Total pages
  const [totalPages, setTotalPages] = useState(1);
  // cant per page
  const [perPage, setPerPage] = useState(10);

  async function getCryptoData () {
    try {
      if (totalPages === 1) {
        const data = await fetch('https://api.coingecko.com/api/v3/coins/list')
          .then((res) => res.json());
        setTotalPages(Math.ceil(data.length / perPage));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`, { headers: { mode: 'no-cors' } })
        .then((res) => res.json());
      setCryptoData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async function getSearchResults (query:string) {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
        .then((res) => res.json());

      setSearchData(data.coins);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  const resetFunction = () => {
    setPage(1);
    setCoinSearch('');
    setCurrency('usd');
    setSortBy('market_cap_desc');
    setPerPage(10);
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  return (
    <CryptoContext.Provider value={{ cryptoData, searchData, currency, sortBy, page, totalPages, perPage, getSearchResults, setCoinSearch, setSearchData, setCurrency, setSortBy, setPage, resetFunction, setPerPage }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);

  if (context === undefined) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }

  return context;
};
