import { NavLink } from 'react-router-dom';
import { Routes } from '../models';

export default function Nav () {
  const routes = [
    { to: Routes.home, name: 'Crypto' },
    { to: Routes.trending, name: 'Trending' },
    { to: Routes.saved, name: 'Saved' }
  ];
  return (
    <nav
      className='w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg '
    >
      {routes.map((route, index) => (
        <Navigation key={index} to={route.to} name={route.name} />
      ))}
    </nav>
  );
}

const Navigation = ({ to, name }:{to:string, name:string}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full text-base text-center font-nunito m-2.5 rounded capitalize font-semibold   ${isActive ? 'bg-cyan text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-30 border-0 cursor-pointer '}`}
    >
      {name}
    </NavLink>
  );
};
