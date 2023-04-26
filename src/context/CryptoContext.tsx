import { ICryptoData } from '@/models';
import { createContext, useState, useContext, Dispatch, useLayoutEffect } from 'react';

interface IContextProps{
  cryptoData: ICryptoData[];
  setCryptoData:Dispatch<React.SetStateAction<never[]>>
}

type Props = {
  children: React.ReactNode;
};

const CryptoContext = createContext<IContextProps>({
  cryptoData: [],
  setCryptoData: () => null
});

export const CryptoProvider = ({ children }:Props) => {
  const [cryptoData, setCryptoData] = useState([]);

  async function getCryptoData () {
    try {
      const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en')
        .then((res) => res.json());

      setCryptoData(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptoData, setCryptoData }}>
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
