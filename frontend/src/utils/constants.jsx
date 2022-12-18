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
    text: 'Dashboard',
    icon: <MdOutlineSpaceDashboard className="text-2xl" />,
  },
  {
    text: 'Client Facing',
    icon: null,
  },
  {
    text: 'Products',
    icon: <AiOutlineShoppingCart className="text-2xl" />,
  },
  {
    text: 'Customers',
    icon: <MdOutlineGroups className="text-2xl" />,
  },
  {
    text: 'Transactions',
    icon: <MdOutlineReceiptLong className="text-2xl" />,
  },
  {
    text: 'Geography',
    icon: <MdPublic className="text-2xl" />,
  },
  {
    text: 'Sales',
    icon: null,
  },
  {
    text: 'Overview',
    icon: <MdPointOfSale className="text-2xl" />,
  },
  {
    text: 'Daily',
    icon: <MdToday className="text-2xl" />,
  },
  {
    text: 'Monthly',
    icon: <AiOutlineCalendar className="text-2xl" />,
  },
  {
    text: 'Breakdown',
    icon: <AiOutlinePieChart className="text-2xl" />,
  },
  {
    text: 'Management',
    icon: null,
  },
  {
    text: 'Admin',
    icon: <MdOutlineAdminPanelSettings className="text-2xl" />,
  },
  {
    text: 'Performance',
    icon: <MdTrendingUp className="text-2xl" />,
  },
]

const customerColumns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 0.5,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    flex: 0.5,
    valueFormatter: (params) => {
      const valueFormatted = params.value.replace(/^(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3')
      return valueFormatted
    },
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 0.4,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    flex: 1,
  },
]

const transactionColumns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'userId',
    headerName: 'User ID',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'CreatedAt',
    flex: 1,
  },
  {
    field: 'products',
    headerName: '# of Products',
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
]

export { navItems, customerColumns, transactionColumns }
