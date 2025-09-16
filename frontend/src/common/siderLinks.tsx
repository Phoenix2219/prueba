import {  
  LaptopOutlined,
  FilePdfOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  SmileOutlined,
  HomeOutlined,
} from "@ant-design/icons"

interface UserProps {
  _id: string
  username: string
  email: string
  role: string
}

export const getNavItems = (user: UserProps) => {
  const { _id, role } = user

  const ADMIN_ITEMS = [
    { label: "Inicio", key: "/home", icon: <HomeOutlined /> },
    { label: "Panel", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Discounts", key: "/discounts", icon: <SmileOutlined /> },
    { label: "Orders", key: `/orders`, icon: <OrderedListOutlined /> },
    { label: "Users", key: `/users`, icon: <UsergroupAddOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ] 

  const DOCENTE_ITEMS = [
    { label: "Inicio", key: "/home", icon: <HomeOutlined /> },
    { label: "Dashboard", key: "/dashboard", icon: <LaptopOutlined /> },
    { label: "Discounts", key: "/discounts", icon: <SmileOutlined /> },
    { label: "Orders", key: `/orders`, icon: <OrderedListOutlined /> },
    { label: "Users", key: `/users`, icon: <UsergroupAddOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ] 

  const ESTUDIANTE_ITEMS = [
    { label: "Inicio", key: "/home", icon: <HomeOutlined /> },
    { label: "Archivos", key: "/file", icon: <FilePdfOutlined /> },
    { label: "Profile", key: `/profile/${_id}`, icon: <UserOutlined /> },
  ]

  switch (role) {
    case "administrador":
      return ADMIN_ITEMS
    case "docente":
      return DOCENTE_ITEMS    
    default:
      return ESTUDIANTE_ITEMS
  }
}
