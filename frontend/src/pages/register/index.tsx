import { Form, Input, Button, message, Select } from "antd"
import { useSignupMutation } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/slices/userSlice"

const Register = () => {
  const [form] = Form.useForm()
  const [signup, { isLoading }] = useSignupMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values: {
    username: string
    email: string
    password: string
    role: string[]
  }) => {
    try {
      const user = await signup(values).unwrap()
      message.success("Signup successful!")
      dispatch(setUser(user))
      form.resetFields()
      navigate("/login")
    } catch (error) {
      message.error("Signup failed. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-primary">
      <div>
        <h1 className="text-2xl text-center pb-10">
          Welcome to MERN-Dashboard
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter email.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="developer">Developer</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="superadmin">Superadmin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
