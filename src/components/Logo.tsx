import { Link } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';

export default function Logo () {
  return (
    <Link
      to='/'
      className='absolute sm:top-[1.5rem] top-[1rem] sm:left-[1.5rem] left-[1rem] [text-decoration:none]  text-cyan cursor-pointer flex items-center sm:text-lg text-md '
    >
      <img src={logoSvg} alt='logo' className='w-[60px] lg:w-[80px] h-auto' />
    </Link>
  );
}
