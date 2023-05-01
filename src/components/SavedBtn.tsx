import { useStorageContext } from '@/context';
import { StartIconSVG } from '.';

const SavedBtn = ({ coinId }: {coinId:string}) => {
  const { saveCoin, allCoins } = useStorageContext();
  return (
    <button onClick={() => saveCoin(coinId)} className='outline-0 border-0 bg-none cursor-pointer'>
      <StartIconSVG className={`w-[1.5rem] ml-1.5 ${allCoins.includes(coinId) ? 'fill-cyan' : 'fill-gray-100 hover:fill-cyan'} `} />
    </button>
  );
};

export default SavedBtn;
