/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { createContext, useState, useContext, useLayoutEffect, useEffect } from 'react';
import { useCryptoContext } from '.';
import { ICryptoData } from '@/models';

interface IContextProps{
  allCoins: Array<string>,
  savedData: ICryptoData[],
  saveCoin: (coinId:string) => void,
  getLastSavedData: () => void
}

type Props = {
  children: React.ReactNode;
};

const StorageContext = createContext<IContextProps>({
  allCoins: [],
  savedData: [],
  saveCoin: () => null,
  getLastSavedData: () => null
});

export const StorageProvider = ({ children }:Props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState<ICryptoData[]>([]);

  const { sortBy, perPage, page, currency } = useCryptoContext();

  const saveCoin = (coinId:string) => {
    const oldCoins = JSON.parse(localStorage.getItem('coins') || '[]');

    if (!oldCoins.includes(coinId)) {
      localStorage.setItem('coins', JSON.stringify([...oldCoins, coinId]));
      setAllCoins([...oldCoins, coinId] as any);
    } else {
      const newCoins = oldCoins.filter((coin:string) => coin !== coinId);
      localStorage.setItem('coins', JSON.stringify(newCoins));
      setAllCoins(newCoins as any);
    }
  };

  const getSavedData = async () => {
    if (allCoins.length > 0) {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${allCoins.join(',')}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`, { headers: { mode: 'no-cors' } })
          .then((res) => res.json());
        setSavedData(data);
      } catch (error) {
      // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  const getLastSavedData = async () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData();
    } else {
      setSavedData([]);
    }
  }, [allCoins]);

  useLayoutEffect(() => {
    if (!localStorage.getItem('coins')) {
      localStorage.setItem('coins', JSON.stringify([]));
    } else {
      setAllCoins(JSON.parse(localStorage.getItem('coins') || '[]'));
    }
    getSavedData();
  }, []);

  return (
    <StorageContext.Provider value={{ allCoins, savedData, saveCoin, getLastSavedData }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorageContext = () => {
  const context = useContext(StorageContext);

  if (context === undefined) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }

  return context;
};
