import { useCryptoContext } from '@/context';
import { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectIcon } from './Icons';

export default function CryptoDetails () {
  const { getCoinData, coinData, currency } = useCryptoContext();
  const navigate = useNavigate();
  const { coinId } = useParams();

  const close = () => {
    navigate('..');
  };

  useLayoutEffect(() => {
    if (!coinId) return;
    getCoinData(coinId);
  }, [coinId]);

  return ReactDOM.createPortal(
    <div
      className='fixed top-0 w-full h-full bg-gray-200 bg-opacity-30  backdrop-blur-sm flex items-center justify-center font-nunito'
      onClick={close}
    >
      <div
        className='w-[65%] h-[75%] bg-gray-300 bg-opacity-75 relative  text-white rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {
          coinData && (
            <div className='flex items-center justify-center h-full w-full p-4'>
              <div className='flex flex-col w-[45%] h-full pr-2 '>

                <TitleComponent coinName={coinData.name} coinSymbol={coinData.symbol} coinLogo={coinData.image.large} />

                <PriceComponent price={Number(coinData.market_data.current_price[currency.toLowerCase()])} percentage={Number(coinData.market_data.price_change_percentage_24h)} currency={currency} />

              </div>
              <div className='flex flex-col w-[55%] h-full pl-3 '>
                right
              </div>
            </div>
          )
        }
      </div>
    </div>,
    document.getElementById('model') as HTMLElement
  );
}

const TitleComponent = ({ coinName, coinSymbol, coinLogo }: {coinName: string, coinSymbol: string, coinLogo:string}) => (
  <div className='flex w-full items-center'>
    <img src={coinLogo} alt='coin icon' className='w-[3rem] h-[3rem] mx-1.5' />
    <h1 className='text-xl capitalize font-medium'>{coinName}</h1>
    <span className='text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase'>{coinSymbol}</span>
  </div>
);

const PriceComponent = ({ price, percentage, currency }: {price: number, percentage: number, currency:string}) => (
  <div className='flex w-full mt-6 '>
    <div className='flex flex-col w-full'>
      <div className='flex justify-between '>

        <span className='text-sm capitalize text-gray-100'>Price</span>

        <div className={`text-sm px-1 ml-2 font-medium flex items-center rounded uppercase bg-opacity-25 ${percentage > 0 ? 'bg-green text-green' : ' bg-red text-red'}`}><span>{percentage.toFixed(2)}%</span>
          <SelectIcon className={` w-[1rem] ml-0.5 ${percentage > 0 ? 'fill-green rotate-180 ' : ' fill-red '}`} />
        </div>
      </div>
      <h2 className='text-lg font-bold'>
        {price.toLocaleString('en-US', {
          style: 'currency',
          currency,
          maximumSignificantDigits: 5
        })}
      </h2>
    </div>
  </div>
);
