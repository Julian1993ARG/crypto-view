import { createContext, useState, useContext, Dispatch } from 'react';

interface IContextProps{
  coins: any[];
  setCoins:Dispatch<React.SetStateAction<never[]>>
}

type Props = {
  children: React.ReactNode;
};

const CryptoContext = createContext<IContextProps>({
  coins: [],
  setCoins: () => null
});

export const CryptoProvider = ({ children }:Props) => {
  const [coins, setCoins] = useState([]);

  return (
    <CryptoContext.Provider value={{ coins, setCoins }}>
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
