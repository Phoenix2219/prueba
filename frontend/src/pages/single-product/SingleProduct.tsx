import { useState, useMemo, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "../../redux/slices/productsSlice"
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Select,
  Tag,
  message,
  Upload,
  UploadFile,
} from "antd"
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import NestedLayout from "../../components/layouts/NestedLayout"
import moment from "moment"
import { CATEGORY_TYPES, SIZES } from "../../common/constants"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import Loading from "../../components/ui/Loading"
import { app } from "../../firebase"

interface StateProps {
  user: {
    currentUser: {
      role: string
    }
  }
}

// interface SingleProductData {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   sizes: string[];
//   productImages: string[];
//   createdAt: string;
//   createdBy?: {
//     username: string;
//   };
// }

interface FormValues {
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  productImages: string[]
}

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data: singleProductData,
    refetch,
    isLoading,
  } = useGetProductByIdQuery(id)
  const [deleteProduct] = useDeleteProductByIdMutation()
  const [updateProduct] = useUpdateProductByIdMutation()

  const user = useSelector((state: StateProps) => state.user.currentUser)
  const navigate = useNavigate()

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [productImages, setProductImages] = useState<string[]>([])

  useEffect(() => {
    if (singleProductData && singleProductData.productImages) {
      setProductImages(singleProductData.productImages)
    }
  }, [singleProductData])

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }

  const handleFileUpload = (file: UploadFile) => {
    return new Promise<string>((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(
        storageRef,
        file.originFileObj as Blob
      )

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          console.error("File upload error:", error)
          message.error("Error uploading file")
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductImages((prev) => [...prev, downloadURL])
            message.success("File uploaded successfully")
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(id!).unwrap()
      message.success("Product deleted")
      navigate("/")
    } catch (error) {
      message.error("Error while deleting the product")
      console.log(error)
    }
  }

  const handleUpdate = async (values: FormValues) => {
    try {
      const uploadPromises = fileList.map((file) => handleFileUpload(file))
      const uploadedImages = await Promise.all(uploadPromises)

      // Update the productImages state after all uploads are complete
      const updatedValues = {
        ...values,
        productImages: [...productImages, ...uploadedImages],
      }
      await updateProduct({ id, ...updatedValues }).unwrap()
      message.success("Product updated successfully!")
      refetch()
    } catch (error) {
      message.error("An unknown error occurred")
      console.error("Error updating product:", error)
    }
  }

  const handleDeleteImage = (image: string) => {
    setProductImages((prev) => prev.filter((img) => img !== image))
  }

  const fields = useMemo(() => {
    if (!singleProductData)
      return [
        { name: ["name"], value: `Loading..` },
        { name: ["description"], value: `Loading..` },
        { name: ["price"], value: `Loading..` },
        { name: ["category"], value: `Loading...` },
        { name: ["sizes"], value: `Loading...` },
      ]
    return [
      { name: ["name"], value: `${singleProductData?.name}` },
      { name: ["description"], value: `${singleProductData?.description}` },
      { name: ["price"], value: singleProductData?.price },
      { name: ["category"], value: singleProductData?.category },
      { name: ["sizes"], value: singleProductData?.sizes },
    ]
  }, [singleProductData])

  const [form] = Form.useForm()

  if (isLoading) return <Loading />

  return (
    <NestedLayout
      title={singleProductData?.name}
      createdAt={moment(singleProductData?.createdAt).format("D MMM YYYY LT")}
      createdBy={singleProductData?.createdBy?.username}
    >
      <div className="flex justify-center">
        <Form
          className="p-5 w-full bg-white sm:w-[500px] pt-[100px]"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
          fields={fields}
          onFinish={handleUpdate}
          disabled={user && user?.role === "user"}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input placeholder="Enter product name.." className="w-full" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input
              placeholder="Enter product description.."
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Category" name="category" required>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select or enter Category Type"
            >
              {CATEGORY_TYPES.map((category) => (
                <Select.Option key={category.id} value={category.value}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Sizes" name="sizes" required>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select sizes"
            >
              {SIZES.map((size) => (
                <Select.Option key={size.id} value={size.value}>
                  {size.size.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input
              placeholder="Enter product price.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          <div className="flex flex-wrap border">
            {productImages.map((image) => (
              <div key={image} className="relative m-3">
                <img src={image} className="h-[100px] w-[100px]" alt="" />
                <Button
                  type="text"
                  className="absolute top-0 right-0 bg-white text-red-500"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteImage(image)}
                />
              </div>
            ))}
          </div>

          <Form.Item label="Upload Image" valuePropName="fileList">
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          {user.role === "user" ? (
            <div className="flex justify-center">
              <Tag className="flex w-min text-lg" color="volcano">
                You are only allowed to view the product as a User.
              </Tag>
            </div>
          ) : (
            <Form.Item>
              <div className="flex justify-between">
                <Popconfirm
                  title="Delete Product"
                  description="Are you sure to delete this product?"
                  onConfirm={handleDelete}
                >
                  <Button className="w-full mx-2" danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Button
                  className="w-full bg-green-600 text-white mx-2"
                  type="primary"
                  htmlType="submit"
                >
                  Update
                </Button>
              </div>
            </Form.Item>
          )}
        </Form>
      </div>
    </NestedLayout>
  )
}

export default SingleProduct
