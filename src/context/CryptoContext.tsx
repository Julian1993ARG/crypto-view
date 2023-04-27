import { ICoin, ICryptoData } from '@/models';
import { createContext, useState, useContext, useLayoutEffect, Dispatch } from 'react';

interface IContextProps{
  cryptoData: ICryptoData[],
  searchData: ICoin[],
  currency: string,
  getSearchResults: (query:string) => void,
  setCoinSearch: Dispatch<React.SetStateAction<string>>,
  setSearchData: Dispatch<React.SetStateAction<never[]>>,
  setCurrency: Dispatch<React.SetStateAction<string>>

}

type Props = {
  children: React.ReactNode;
};

const CryptoContext = createContext<IContextProps>({
  cryptoData: [],
  searchData: [],
  currency: 'usd',
  getSearchResults: () => null,
  setCoinSearch: () => null,
  setSearchData: () => null,
  setCurrency: () => null
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

  async function getCryptoData () {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
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

  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency]);

  return (
    <CryptoContext.Provider value={{ cryptoData, searchData, currency, getSearchResults, setCoinSearch, setSearchData, setCurrency }}>
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
