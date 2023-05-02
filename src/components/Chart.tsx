/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { useCryptoContext } from '@/context';
import { useLayoutEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

type Data = {
  date: string;
  prices: number;
}

type Mode = 'prices' | 'market_caps' | 'total_volumes';

export default function Chart ({ coinId }: {coinId: string | undefined}) {
  const { currency } = useCryptoContext();
  const [coinData, setCoinData] = useState<Data[]>([]);
  const [type, setType] = useState<Mode>('prices');
  const [days, setDays] = useState<7 | 14 | 30>(7);

  const getChartData = async (coinId: string) => {
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
        .then((res) => res.json());

      const covertData:Data[] = data[type].map((item:Array<number>) => {
        return {
          date: new Date(item[0]).toLocaleDateString(),
          [type]: item[1]
        };
      }
      );
      setCoinData(covertData);
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    if (coinId) getChartData(coinId);
  }, [coinId, type, days]);

  return (
    <div className='w-full h-[60%]'>
      <ChartComponent chartData={coinData} currency={currency} type={type} />
      <div className='flex md:flex-nowrap flex-wrap '>
        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${type === 'prices' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'} `} onClick={() => setType('prices')}>Price</button>
        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${type === 'market_caps' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType('market_caps')}>market caps</button>
        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${type === 'total_volumes' ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setType('total_volumes')}>total volumes</button>

        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${days === 7 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(7)}>7d</button>
        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${days === 14 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(14)}>14d</button>
        <button className={`rounded-md text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 capitalize ${days === 30 ? 'bg-cyan text-cyan' : 'bg-gray-200 text-gray-100'}`} onClick={() => setDays(30)}>30d</button>

      </div>
    </div>
  );
}

type ChartComponentProps = {
  chartData: Data[];
  currency: string;
  type: Mode
}

const ChartComponent = ({ chartData, currency, type }:ChartComponentProps) => {
  return (
    <ResponsiveContainer height='90%'>
      <LineChart width={400} height={400} data={chartData}>
        <Line
          type='monotone'
          dataKey={type}
          stroke='#14ff3c'
          strokeWidth='1px'
        />
        <CartesianGrid stroke='#323232' />
        <XAxis dataKey='date' hide />
        <YAxis dataKey={type} hide domain={['auto', 'auto']} />
        {/* @ts-ignore */}
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: 'none' }} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

// @ts-ignore
function CustomTooltip ({ payload, label, active, currency = 'usd' }) {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label text-sm text-cyan'>{`${label} : ${payload[0].value.toLocaleString('en-US', {
                    style: 'currency',
                    currency,
                    minimumFractionDigits: 2
                  })}`}
        </p>
      </div>
    );
  }

  return null;
}
