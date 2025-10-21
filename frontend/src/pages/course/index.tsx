import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  message,
  Form,
  Input,
  Button,
  Select,
  Popconfirm,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  selectConfiguration,
} from "../../redux/slices/configurationSlice";
import { MODAL_STATE } from "../../common/states";
import {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../../redux/slices/coursesSlice";
import { useGetAllUsersQuery } from "../../redux/slices/usersSlice";
import Loading from "../../components/ui/Loading";
import ModalComponent from "../../components/ui/Modal";

interface Course {
  _id: string;
  teacherId: string | { _id: string; username: string };
  nameCourse: string;
  dateCourse: string;
  state: "activo" | "inactivo";
}

const Courses = () => {
  const {
    data: courses = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllCoursesQuery(undefined);
  const { data: users = [] } = useGetAllUsersQuery(undefined);

  const [addCourse] = useAddCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const configuration = useSelector(selectConfiguration);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    const teacherId =
    typeof course.teacherId === "object"
      ? course.teacherId._id
      : course.teacherId;
    form.setFieldsValue({
      nameCourse: course.nameCourse,
      teacherId,
      state: course.state,
    });
    dispatch(toggleModal(MODAL_STATE.UPDATE_COURSE_MODAL));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id).unwrap();
      message.success("Curso marcado como inactivo");
      refetch();
    } catch {
      message.error("Error al inactivar curso");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing && selectedCourse) {
        await updateCourse({ id: selectedCourse._id, ...values }).unwrap();
        message.success("Curso actualizado correctamente");
      } else {
        await addCourse(values).unwrap();
        message.success("Curso agregado correctamente");
      }
      form.resetFields();
      dispatch(toggleModal(MODAL_STATE.UPDATE_COURSE_MODAL));
      refetch();
    } catch (err) {
      message.error("Error al guardar curso");
      console.error(err);
    }
  };

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "nameCourse",
      key: "nameCourse",
    },
    {
      title: "Docente",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (teacher: any) => teacher?.username || "Sin asignar",
    },
    {
      title: "Fecha de creación",
      dataIndex: "dateCourse",
      key: "dateCourse",
      render: (date: string) =>
        new Date(date).toLocaleDateString("es-PE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      render: (state: string) => (
        <Tag color={state === "activo" ? "green" : "volcano"}>
          {state.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: Course) => (
        <Space>
          <a className="text-blue-500" onClick={() => handleEdit(record)}>
            Editar
          </a>
          {record.state === "activo" && (
            <Popconfirm
              title="Inactivar curso"
              description="¿Desea marcar este curso como inactivo?"
              onConfirm={() => handleDelete(record._id)}
              icon={<DeleteOutlined style={{ color: "red" }} />}
              okText="Inactivar"
              cancelText="Cancelar"
            >
              <a className="text-red-500">Inactivar</a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (isError) return <div>Error al cargar los cursos</div>;

  return (
    <div className="sm:p-2 md:p-6">
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsEditing(false);
            form.resetFields();
            dispatch(toggleModal(MODAL_STATE.UPDATE_COURSE_MODAL));
          }}
        >
          Agregar curso
        </Button>
      </div>

      <Table dataSource={courses} columns={columns} rowKey="_id" />

      <ModalComponent
        modalTitle={isEditing ? "Actualizar curso" : "Agregar curso"}
        open={configuration[MODAL_STATE.UPDATE_COURSE_MODAL]}
        onCancel={() => dispatch(toggleModal(MODAL_STATE.UPDATE_COURSE_MODAL))}
      >
        <Form
          form={form}
          layout="vertical"
          className="p-5"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Nombre del curso"
            name="nameCourse"
            rules={[{ required: true, message: "Ingrese el nombre del curso" }]}
          >
            <Input placeholder="Ej. Matemática Básica" />
          </Form.Item>

          <Form.Item
            label="Docente"
            name="teacherId"
            rules={[{ required: true, message: "Seleccione un docente" }]}
          >
            <Select placeholder="Seleccione un docente">
              {users
                .filter((u: any) => u.role === "docente")
                .map((teacher: any) => (
                  <Select.Option key={teacher._id} value={teacher._id}>
                    {teacher.username}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          {isEditing && (
            <Form.Item
              label="Estado"
              name="state"
              rules={[{ required: true, message: "Seleccione el estado" }]}
            >
              <Select>
                <Select.Option value="activo">Activo</Select.Option>
                <Select.Option value="inactivo">Inactivo</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button
              className="bg-secondary w-full"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {isEditing ? "Actualizar" : "Agregar"}
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default Courses;
