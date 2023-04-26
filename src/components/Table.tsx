import { useCryptoContext } from '@/context';
import { StartIconSVG } from '.';

export default function Table () {
  const { cryptoData } = useCryptoContext();
  return (
    <div className='flex flex-col mt-9 border border-gray-100 rounded '>
      <table className='w-full table-auto'>
        <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100 '>
          <tr>
            <th className='py-1'>asset</th>
            <th className='py-1'>name</th>
            <th className='py-1'>price</th>
            <th className='py-1'>total volume</th>
            <th className='py-1'>market cap change</th>
            <th className='py-1'>1H</th>
            <th className='py-1'>24H</th>
            <th className='py-1'>7D</th>
          </tr>
        </thead>
        <tbody>
          {
            cryptoData.map((data) => (
              <tr key={data.id} className='text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0'>
                <td className='py-4 flex items-center uppercase'>
                  <button className='outline-0 border-0 bg-none cursor-pointer'>
                    <StartIconSVG className='w-[1.5rem] ml-1.5 fill-gray-100 hover:fill-cyan' />
                  </button>
                  <img
                    src={data.image}
                    alt='coin image'
                    className='w-[1.2rem] h-[1.2rem] mx-1.5'
                  />
                  <span>{data.symbol}</span>
                </td>
                <td className='py-4'>{data.name}</td>
                <td className='py-4'>{
                  Number(data.current_price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                }
                </td>
                <td className='py-4'>{data.total_volume}</td>
                <td className='py-4'>{data.market_cap_change_percentage_24h}%</td>
                <td className={
                  data.price_change_percentage_1h_in_currency > 0
                    ? 'text-green py-4'
                    : 'text-red py-4'
                }
                >{Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                </td>
                <td className={
                  data.price_change_percentage_24h_in_currency > 0
                    ? 'text-green py-4'
                    : 'text-red py-4'
                }
                >{Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                </td>
                <td className={
                  data.price_change_percentage_7d_in_currency > 0
                    ? 'text-green py-4'
                    : 'text-red py-4'
                }
                >{Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
