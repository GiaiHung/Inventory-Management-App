import { AiOutlineCalendar, AiOutlinePieChart, AiOutlineShoppingCart } from 'react-icons/ai'
import {
  MdOutlineAdminPanelSettings,
  MdOutlineGroups,
  MdOutlineReceiptLong,
  MdOutlineSpaceDashboard,
  MdPointOfSale,
  MdPublic,
  MdToday,
  MdTrendingUp,
} from 'react-icons/md'

const navItems = [
  {
    text: 'Home',
    icon: <MdOutlineSpaceDashboard className='text-2xl'/>,
  },
  {
    text: 'Client Facing',
    icon: null,
  },
  {
    text: 'Products',
    icon: <AiOutlineShoppingCart className='text-2xl'/>,
  },
  {
    text: 'Customers',
    icon: <MdOutlineGroups className='text-2xl'/>,
  },
  {
    text: 'Transactions',
    icon: <MdOutlineReceiptLong className='text-2xl'/>,
  },
  {
    text: 'Geography',
    icon: <MdPublic className='text-2xl'/>,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <MdPointOfSale className='text-2xl'/>,
  },
  {
    text: 'Daily',
    icon: <MdToday className='text-2xl'/>,
  },
  {
    text: 'Monthly',
    icon: <AiOutlineCalendar className='text-2xl'/>,
  },
  {
    text: 'Breakdown',
    icon: <AiOutlinePieChart className='text-2xl'/>,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <MdOutlineAdminPanelSettings className='text-2xl'/>,
  },
  {
    text: 'Performance',
    icon: <MdTrendingUp className='text-2xl'/>,
  },
]

export { navItems }
