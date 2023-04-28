import { useCryptoContext } from '@/context';
import { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';

export default function CryptoDetails () {
  const { getCoinData, coinData } = useCryptoContext();
  const { coinId } = useParams();

  useLayoutEffect(() => {
    if (!coinId) return;
    getCoinData(coinId);
  }, [coinId]);
  return ReactDOM.createPortal(
    <div className='fixed top-0 w-full h-full bg-gray-200 bg-opacity-30  backdrop-blur-sm flex items-center justify-center font-nunito'>
      <div className='w-[65%] h-[75%] bg-gray-300 bg-opacity-75 relative  text-white rounded-lg'>
        {
          coinData && (
            <h1>{coinData.name}</h1>
          )
        }
      </div>
    </div>,
    document.getElementById('model') as HTMLElement
  );
}
