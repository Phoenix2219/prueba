import { Form, Input, Button, message } from "antd";
import { useSigninMutation } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useSpring, animated } from "@react-spring/web";

const Login = () => {
  const [form] = Form.useForm();
  const [signin, { isLoading }] = useSigninMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const user = await signin(values).unwrap();
      dispatch(setUser({ user: user, accessToken: user.token }));
      message.success("Login exitoso");
      form.resetFields();
      navigate("/home");
    } catch (error) {
      message.error("Credenciales inválidas");
    }
  };

  // Animación del contenedor
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(-40px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 18 }
  });

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      {/* Círculos animados de fondo */}
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>

      <animated.div style={fadeIn} className="z-10 w-[90%] sm:w-[400px] bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto w-20 h-20 rounded-full shadow-md border border-white/30" />
          <h1 className="text-3xl font-bold text-white mt-4">Bienvenido</h1>
          <p className="text-white/70">Accede con tus credenciales</p>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-white">Correo</span>}
            name="email"
            rules={[{ required: true, message: "Ingrese su correo!" }]}
          >
            <Input placeholder="correo@ejemplo.com" className="rounded-xl py-2" />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Contraseña</span>}
            name="password"
            rules={[{ required: true, message: "Ingrese su contraseña!" }]}
          >
            <Input.Password placeholder="••••••••" className="rounded-xl py-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full rounded-xl py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-all duration-300"
            >
              Ingresar
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4 text-sm text-white/80">
          ¿No tienes cuenta? <a href="/register-student" className="underline hover:text-white">Regístrate</a>
        </div>
      </animated.div>
    </div>
  );
};

export default Login;
