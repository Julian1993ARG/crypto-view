/* eslint-disable react/jsx-indent */
import { ResetIcon, SavedBtn } from '@/components';
import { useCryptoContext, useStorageContext } from '@/context';
import { Link, Outlet } from 'react-router-dom';

export default function SavedCoins () {
  const { savedData, getLastSavedData } = useStorageContext();
  const { currency } = useCryptoContext();
  return (
    <section className='w-[80%] h-full flex flex-col mt-6 mb-24 relative '>
      <div className='flex flex-col mt-9 border border-gray-100 rounded '>

        {
          savedData.length > 0
            ? (<table className='w-full table-auto'>
              <thead className='capitalize text-base text-gray-100 font-medium border-b border-gray-100 '>
                <tr>
                  <th className='py-1'>asset</th>
                  <th className='py-1'>name</th>
                  <th className='py-1'>price</th>
                  <th className='py-1'>total volume</th>
                  <th className='py-1'>market cap change</th>
                  <th className='py-1 lg:table-cell hidden'>1H</th>
                  <th className='py-1 lg:table-cell hidden'>24H</th>
                  <th className='py-1 lg:table-cell hidden'>7D</th>
                </tr>
              </thead>
              <tbody>
                {
            savedData.map((data) => (
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
                <td className='py-4'>
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
                <td className='py-4'>{data.total_volume}</td>
                <td className='py-4'>{data.market_cap_change_percentage_24h}%</td>
                <td className={
                  data.price_change_percentage_1h_in_currency > 0
                    ? 'text-green py-4 lg:table-cell hidden'
                    : 'text-red py-4 lg:table-cell hidden '
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
               </table>)
            : (
              <div className='flex flex-col items-center justify-center h-96'>
                <h1 className='text-2xl font-medium text-gray-100'>No Saved Coins</h1>
                <Link to='/' className='text-cyan text-base font-medium mt-4'>Go to Home</Link>
              </div>
              )
        }
        <button onClick={() => getLastSavedData()} className='absolute right-2 -top-4 w-10'>
          <ResetIcon className='fill-cyan w-full h-auto ' />
        </button>
        <Outlet />
      </div>
    </section>
  );
}
