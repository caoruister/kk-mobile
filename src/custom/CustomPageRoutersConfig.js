import ReserveRoom from 'custom/ReserveRoom';
import ReserveDetail from 'custom/ReserveDetail';
import ReserveSuccess from 'custom/ReserveSuccess';
import Strategy from 'custom/Strategy';
import OrderDetail from 'custom/OrderDetail';
import UserInfo from 'custom/UserInfo';

export const customPageRoutes = [
  { path: '/ReserveRoom', component: ReserveRoom },
  { path: '/ReserveDetail', component: ReserveDetail },
  { path: '/ReserveSuccess', component: ReserveSuccess },
  { path: '/Strategy', component: Strategy },
  { path: '/ViewReserve', component: OrderDetail },
  { path: '/A1', component: UserInfo }
];
