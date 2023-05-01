/* eslint-disable no-console */
import { Coin } from '@/models';
import { createContext, useState, useContext, useLayoutEffect } from 'react';

interface IContextProps{
  cryptosData: Coin[],
  resetTrendingResult: () => void,
}

type Props = {
  children: React.ReactNode;
};

const TrendingContext = createContext<IContextProps>({
  cryptosData: [],
  resetTrendingResult: () => null
});

export const TrendingProvider = ({ children }:Props) => {
  // Get all the data from the API
  const [cryptosData, setCryptosData] = useState([]);

  async function getCryptoData () {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
      const data = await response.json();
      setCryptosData(data.coins);
    } catch (error) {
      console.log(error);
    }
  }

  const resetTrendingResult = () => {
    setCryptosData([]);
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  return (
    <TrendingContext.Provider value={{ cryptosData, resetTrendingResult }}>
      {children}
    </TrendingContext.Provider>
  );
};

export const useTrendingContext = () => {
  const context = useContext(TrendingContext);

  if (context === undefined) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }

  return context;
};
