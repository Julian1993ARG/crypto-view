import { ICoin, ICryptoData } from '@/models';
import { createContext, useState, useContext, useLayoutEffect, Dispatch } from 'react';

interface IContextProps{
  cryptoData: ICryptoData[],
  searchData: ICoin[],
  getSearchResults: (query:string) => void,
  setCoinSearch: Dispatch<React.SetStateAction<string>>,
  setSearchData: Dispatch<React.SetStateAction<never[]>>

}

type Props = {
  children: React.ReactNode;
};

const CryptoContext = createContext<IContextProps>({
  cryptoData: [],
  searchData: [],
  getSearchResults: () => null,
  setCoinSearch: () => null,
  setSearchData: () => null
});

export const CryptoProvider = ({ children }:Props) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState('');

  async function getCryptoData () {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinSearch}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
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
  }, [coinSearch]);

  return (
    <CryptoContext.Provider value={{ cryptoData, searchData, getSearchResults, setCoinSearch, setSearchData }}>
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
