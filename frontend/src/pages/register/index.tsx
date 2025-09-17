import { Form, Input, Button, message, Select } from "antd"
import { useSignupMutation } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()
  const navigate = useNavigate()

  const onFinish = async (values: {
  username: string
  email: string
  password: string
  role: string[]
}) => {
  try {
    await signup(values).unwrap()
    message.success("Usuario registrado exitosamente!")
    form.resetFields()
    navigate("/users")
  } catch (error) {
    message.error("Error al registrar usuario. Intente nuevamente.")
  }
}

  return (
    <div className="flex justify-center items-center h-[100vh] bg-primary">
      <div>
        <h1 className="text-2xl text-center pb-10">
          AcadWrite - Registrar nuevo usuario
        </h1>
        <Form
          className="border p-10 sm:w-[300px] md:w-[400px] bg-white"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Nombre de usuario"
            name="username"
            rules={[{ required: true, message: "Ingrese su usuario!" }]}
          >
            <Input placeholder="Ingrese su usuario.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[{ required: true, message: "Ingrese su correo!" }]}
          >
            <Input placeholder="Ingrese su correo.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingrese su contraseña!" }]}
          >
            <Input.Password placeholder="Ingrese su contraseña.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Rol"
            name="role"
            rules={[{ required: true, message: "Seleccione su rol!" }]}
          >
            <Select placeholder="Seleccione un rol">
              <Select.Option value="estudiante">Estudiante</Select.Option>
              <Select.Option value="docente">Docente</Select.Option>
              <Select.Option value="administrador">Administrador</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
