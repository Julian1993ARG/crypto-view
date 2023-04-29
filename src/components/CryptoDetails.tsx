/* eslint-disable react/jsx-indent */
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

                <HighLowIndicatorComponent
                  currentprice={Number(coinData.market_data.current_price[currency.toLowerCase()])}
                  high={Number(coinData.market_data.high_24h[currency.toLowerCase()])}
                  low={Number(coinData.market_data.low_24h[currency.toLowerCase()])}
                />

                <RestValuesComponent currency={currency} low24hs={Number(coinData.market_data.low_24h[currency.toLowerCase()])} high24H={Number(coinData.market_data.high_24h[currency.toLowerCase()])} maxSupply={Number(coinData.market_data.max_supply)} circulatingSupply={Number(coinData.market_data.circulating_supply)} />

                <LinksComponent
                  negativePercentage={Number(coinData.sentiment_votes_down_percentage)}
                  positivePercentage={Number(coinData.sentiment_votes_up_percentage)}
                  link1={coinData.links?.homepage[0]}
                  link2={coinData.links?.blockchain_site[0]}
                  link3={coinData.links?.official_forum_url[0]}
                />

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
      {
        filutedValuation
          ? <div className='flex flex-col'>
            <span className='text-sm capitalize text-gray-100'>fully diluted valuations</span>
            <h2 className='text-base font-bold'>{filutedValuation.toLocaleString('en-US', {
              style: 'currency',
              currency,
              notation: 'compact'
            })}
            </h2>
            </div>
          : null
      }

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

type RestValuesProps = {
  currency: string,
  low24hs: number,
  high24H: number,
  maxSupply: number,
  circulatingSupply: number
}

const RestValuesComponent = ({ currency, low24hs, high24H, maxSupply, circulatingSupply }:RestValuesProps) => (
  <>

    <div className='flex w-full mt-4 justify-between'>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>LOW 24H</span>
        <h2 className='text-base font-bold'>{low24hs.toLocaleString('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 5
        })}
        </h2>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>high 24H</span>
        <h2 className='text-base font-bold'>{high24H.toLocaleString('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 5
        })}
        </h2>
      </div>
    </div>

    <div className='flex w-full mt-4 justify-between'>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>max supply</span>
        <h2 className='text-base font-bold'>{maxSupply.toLocaleString('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0
        })}
        </h2>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm capitalize text-gray-100'>circulating supply</span>
        <h2 className='text-base font-bold'>{circulatingSupply.toLocaleString('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0
        })}
        </h2>
      </div>
    </div>
  </>
);

type LinksProps = {
  positivePercentage: number,
  negativePercentage: number,
  link1: string,
  link2: string,
  link3: string
}

const LinksComponent = ({ positivePercentage, negativePercentage, link1 = '', link2 = '', link3 = '' }:LinksProps) => (
  <div className='flex w-full mt-4 justify-between'>
    <div className='flex flex-col'>
      <a target='_blank' className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 rounded' href={link1} rel='noreferrer'>{link1.substring(0, 30)}</a>
      <a target='_blank' className='text-sm my-1 bg-gray-200 text-gray-100 px-1.5 py-0.5 rounded' href={link2} rel='noreferrer'>{link2.substring(0, 30)}</a>
      {
        link3
          ? <a target='_blank' className='text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 rounded' href={link3} rel='noreferrer'>{link3.substring(0, 30)}</a>
          : null
      }
    </div>
    <div className='flex flex-col content-start'>
      <span className='text-sm capitalize text-gray-100 ml-2'>sentiment</span>

      <div className='text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-green text-green '><span>{positivePercentage.toFixed(2)}%</span>
        <SelectIcon className=' w-[1rem] ml-0.5 fill-green rotate-180' />
      </div>

      <div className='text-sm px-1 ml-2 my-1 font-medium flex items-center rounded uppercase bg-opacity-25 bg-red text-red '><span>{negativePercentage.toFixed(2)}%</span>
        <SelectIcon className=' w-[1rem] ml-0.5 fill-red ' />
      </div>
    </div>

  </div>
);

type HighLowIndicatorProps = {
  currentprice: number,
  high: number,
  low: number
}

const HighLowIndicatorComponent = ({ currentprice, high, low }: HighLowIndicatorProps) => {
  const greenPercentage = Math.ceil((currentprice - low) / (high - low) * 100);
  const redPercentage = 100 - greenPercentage;
  return (

    <div className='flex w-full mt-4 justify-between'>
      <>
        <span className='bg-red h-1.5 rounded-l-lg w-[50%]' style={{ width: `${redPercentage}%` }}>&nbsp;</span>
        <span className='bg-green h-1.5 rounded-r-lg w-[50%]' style={{ width: `${greenPercentage}%` }}>&nbsp;</span>

      </>
    </div>
  );
};
