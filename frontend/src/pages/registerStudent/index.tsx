import { Form, Input, Button, message, Tooltip } from "antd"
import { useSignupStudentMutation } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const RegisterStudent = () => {
  const [form] = Form.useForm()
  const [signupStudent, { isLoading }] = useSignupStudentMutation()
  const navigate = useNavigate()
  const password = Form.useWatch("password", form) || "";
  const [showTooltip, setShowTooltip] = useState(false)

  const onFinish = async (values: {
    username: string
    email: string
    password: string
  }) => {
    try {
      console.log("Datos enviados:", values);
      await signupStudent(values).unwrap()
      message.success("Usuario registrado exitosamente!")
      form.resetFields()
      navigate("/login")
    } catch (error: any) {
      console.error("Error backend:", error)
      message.error("Error al registrar usuario. Intente nuevamente.")
    }
  }

  const passwordRequirements = [
    { regex: /.{8,}/, label: "Al menos 8 caracteres" },
    { regex: /[A-Z]/, label: "Una mayúscula" },
    { regex: /[a-z]/, label: "Una minúscula" },
    { regex: /\d/, label: "Un número" },
    { regex: /[@$!%*?&.,;:]/, label: "Un caracter especial" },
  ];

  const renderPasswordChecklist = () => (
    <div className="text-sm">
      {passwordRequirements.map((req, i) => {
        const valid = req.regex.test(password);
        return (
          <div
            key={i}
            className={`flex items-center gap-1 ${valid ? "text-green-600" : "text-red-600"
              }`}
          >
            {valid ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            {req.label}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex justify-center items-center h-[100vh] bg-primary">
      <div>
        <h1 className="text-2xl text-center pb-10">
          AcadWrite - Registrarse
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
            rules={[
              { required: true, message: "Ingrese su contraseña!" },
              {
                validator: (_, value) => {
                  const regex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:]).{8,}$/;
                  if (!value) return Promise.resolve();
                  if (!regex.test(value)) {
                    return Promise.reject(
                      "La contraseña no cumple con los requisitos."
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Tooltip
              title={renderPasswordChecklist()}
              open={showTooltip}
              placement="right"
              color="white"
              align={{ offset: [40, 0] }}
            >
              <Input.Password
                placeholder="Ingrese su contraseña.."
                className="w-full"
                value={password} // 👈 se conecta al estado
                onChange={(e) => {
                  form.setFieldsValue({ password: e.target.value }); // 👈 sincroniza el form
                }}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
            </Tooltip>
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

export default RegisterStudent
