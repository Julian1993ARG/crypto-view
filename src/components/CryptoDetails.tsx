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

                <FullValuesComponent currency={currency} marketCap={Number(coinData.market_data.market_cap[currency.toLowerCase()])} filutedValuation={Number(coinData.market_data.fully_diluted_valuation[currency.toLowerCase()])} totalVolume={Number(coinData.market_data.total_volume[currency.toLocaleLowerCase()])} />

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

type TitleProps = {
  coinName: string,
  coinSymbol: string,
  coinLogo: string
}

const TitleComponent = ({ coinName, coinSymbol, coinLogo }: TitleProps) => (
  <div className='flex w-full items-center'>
    <img src={coinLogo} alt='coin icon' className='w-[3rem] h-[3rem] mx-1.5' />
    <h1 className='text-xl capitalize font-medium'>{coinName}</h1>
    <span className='text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase'>{coinSymbol}</span>
  </div>
);

type PriceProps = {
  price: number,
  percentage: number,
  currency: string
}

const PriceComponent = ({ price, percentage, currency }: PriceProps) => (
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

type FullValuesProps = {
  currency: string,
  marketCap: number
  filutedValuation: number,
  totalVolume: number
}

const FullValuesComponent = ({ currency, marketCap, filutedValuation, totalVolume }:FullValuesProps) => (
  <>
    <div className='flex w-full mt-4 justify-between'>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>Market Cap</span>
        <h2 className='text-base font-bold'>{marketCap.toLocaleString('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0
        })}
        </h2>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>fully diluted valuations</span>
        <h2 className='text-base font-bold'>{filutedValuation.toLocaleString('en-US', {
          style: 'currency',
          currency,
          notation: 'compact'
        })}
        </h2>
      </div>

    </div>

    <div className='flex flex-col w-full mt-4 justify-between'>
      <span className='text-sm capitalize text-gray-100'>total volume</span>
      <h2 className='text-base font-bold'>{totalVolume.toLocaleString('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
      })}
      </h2>
    </div>
  </>
);
