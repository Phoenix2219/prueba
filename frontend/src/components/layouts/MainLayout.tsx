import React, { useState, useEffect } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Layout, Menu, theme } from "antd"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Footer } from "antd/es/layout/layout"
import { getNavItems } from "../../common/siderLinks"
import { clearUser } from "../../redux/slices/userSlice"

const { Header, Content, Sider } = Layout

interface UserState {
  currentUser: {
    _id: string
    username: string
    email: string
    role: string
  } | null
  token: string | null
  isLoading: boolean
  error: string | null
}

const MainLayout: React.FC = () => {
  const dispatch = useDispatch()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const user = useSelector(
    (state: { user: UserState }) => state.user.currentUser
  )
  const NAV_ITEMS = getNavItems(user!)

  // --------------------------
  // Logout y aviso al cerrar
  // --------------------------
  useEffect(() => {
    // Mostrar aviso antes de cerrar
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }

    // Hacer logout al cerrar o recargar
    const handleUnload = () => {
      dispatch(clearUser())
      localStorage.removeItem("access_token") // También eliminas token
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("unload", handleUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("unload", handleUnload)
    }
  }, [dispatch])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, minWidth: 0 }}
          className=" flex justify-end "
        >
          <div className="flex items-center">
            <Avatar
              size={30}
              icon={<UserOutlined />}
              className="mr-2 bg-gray-500"
            />
            <h1 className="sm:text-md md:text-lg">
              Hola, {user!.username.charAt(0).toUpperCase() + user!.username.slice(1)}
            </h1>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          onCollapse={() => setCollapsed(!collapsed)}
          collapsible
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="md"
          collapsedWidth="0"
        >
          <Link to="/home">
            {collapsed ? (
              <h1 className="text-xl flex justify-center py-10">P4</h1>
            ) : (
              <div className="flex justify-center mb-6 mt-6">
                <img
                  src="/logo.png"
                  alt="Logo AcadWrite"
                  width="100"
                  className="rounded-full shadow-md"
                />
              </div>
            )}
          </Link>
          <Menu
            mode="inline"
            selectedKeys={[window.location.pathname]} // Puedes mejorar con useLocation()
            onClick={({ keyPath }) => navigate(`${keyPath}`)}
            style={{ height: "100%", borderRight: 0 }}
            items={NAV_ITEMS}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 16,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        AcadWrite ©{new Date().getFullYear()} | Creado por{" "}
        <a
          target="_blank"
          rel="noopener"
          className="text-red-500 underline"
          href="https://github.com/Phoenix2219"
        >
          @TallerProyectos
        </a>
      </Footer>
    </Layout>
  )
}

export default MainLayout
