import { SavedBtn } from '.';
import { Link } from 'react-router-dom';
import { ICryptoData } from '@/models';

type Props = {
  cryptoData: ICryptoData[],
  currency: string
}

export default function Table ({ cryptoData, currency }:Props) {
  return (
    <>
      <div className='flex flex-col mt-9 border border-gray-100 rounded '>
        <table className='w-full table-auto'>
          <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100 '>
            <tr>
              <th className='py-1'>asset</th>
              <th className='py-1 sm:table-cell hidden'>name</th>
              <th className='py-1'>price</th>
              <th className='py-1 md:table-cell hidden'>total volume</th>
              <th className='py-1 sm:table-cell hidden'>market cap change</th>
              <th className='py-1 lg:table-cell hidden'>1H</th>
              <th className='py-1 lg:table-cell hidden'>24H</th>
              <th className='py-1 lg:table-cell hidden'>7D</th>
            </tr>
          </thead>
          <tbody>
            {
            cryptoData.map((data) => (
              <tr key={data.id} className='text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0'>

                <td className='py-4 flex items-center uppercase'>
                  <SavedBtn coinId={data.id} />
                  <img
                    src={data.image}
                    alt='coin image'
                    className='w-[1.2rem] h-[1.2rem] mx-1.5'
                  />
                  <span>
                    <Link to={`/${data.id}`} className='cursor-pointer'>
                      {data.symbol}
                    </Link>
                  </span>
                </td>

                <td className='py-4 cursor-pointer sm:table-cell hidden'>
                  <Link to={`/${data.id}`} className='cursor-pointer'>
                    {data.name}
                  </Link>
                </td>

                <td className='py-4'>{
                  Number(data.current_price).toLocaleString('en-US', {
                    style: 'currency',
                    currency
                  })
                }
                </td>

                <td className='py-4 sm:table-cell hidden'>{data.total_volume}</td>

                <td className={`py-4 hidden md:table-cell ${data.market_cap_change_percentage_24h > 0 ? 'text-green' : 'text-red'}`}>{data.market_cap_change_percentage_24h.toFixed(2)}%</td>
                <td className={
                  data.price_change_percentage_1h_in_currency > 0
                    ? 'text-green py-4 lg:table-cell hidden'
                    : 'text-red py-4 lg:table-cell hidden'
                }
                >{Number(data.price_change_percentage_1h_in_currency).toFixed(2)}
                </td>

                <td className={
                  data.price_change_percentage_24h_in_currency > 0
                    ? 'text-green py-4 lg:table-cell hidden'
                    : 'text-red py-4 lg:table-cell hidden'
                }
                >{Number(data.price_change_percentage_24h_in_currency).toFixed(2)}
                </td>

                <td className={
                  data.price_change_percentage_7d_in_currency > 0
                    ? 'text-green py-4 lg:table-cell hidden'
                    : 'text-red py-4 lg:table-cell hidden'
                }
                >{Number(data.price_change_percentage_7d_in_currency).toFixed(2)}
                </td>

              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

    </>
  );
}
