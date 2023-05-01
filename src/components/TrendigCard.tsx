import { Item } from '@/models';
import { useNavigate } from 'react-router-dom';

export default function TrendiCard ({ crypto }:{crypto:Item}) {
  const navigate = useNavigate();

  const handleClick = (id:string) => {
    navigate(id);
  };
  return (
    <div
      className='w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40'
      onClick={() => handleClick(crypto.id)}
    >
      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>name:&nbsp; </span>
        <span className='text-cyan'>{crypto.name}</span>
        <img
          src={crypto.small}
          alt='coin image'
          className='w-[1.5rem] h-[1.5rem] mx-1.5 rounded-full'
        />
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>market cap rank:&nbsp; </span>
        <span className='text-cyan'>{crypto.market_cap_rank}</span>
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>price (in btc):&nbsp; </span>
        <span className='text-cyan'>{crypto.price_btc.toLocaleString(
          'en-US',
          {
            style: 'currency',
            currency: 'btc',
            maximumSignificantDigits: 3
          }
        )}
        </span>
      </h3>

      <h3 className='text-base flex items-center my-0.5'>
        <span className='text-gray-100 capitalize'>score:&nbsp; </span>
        <span className='text-cyan'>{crypto.score}</span>
      </h3>

      <img
        src={crypto.large}
        alt='coin image'
        className='w-[35%] h-auto rounded-full absolute top-2/4 -right-12 -translate-y-2/4 '
      />
    </div>
  );
}
