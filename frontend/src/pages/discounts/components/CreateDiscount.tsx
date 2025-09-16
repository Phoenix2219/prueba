import { Input, Select, Button, Form, message } from "antd"
import { MODAL_STATE } from "../../../common/states"
import ModalComponent from "../../../components/ui/Modal"
import { useDispatch, useSelector } from "react-redux"
import {
  selectConfiguration,
  toggleModal,
} from "../../../redux/slices/configurationSlice"
import {
  useCreateDiscountCodeMutation,
  useGetAllDiscountCodesQuery,
} from "../../../redux/apis/discountApiSlice"

interface IValuesTypes {
  code: string
  discountType: boolean
  discountValue: number
  specialDiscount: boolean
  usageLimit: number
  minimumPriceToAvail: number
  active: boolean
}

const CreateDiscount = () => {
  const [form] = Form.useForm()

  const [createDiscountCode] = useCreateDiscountCodeMutation()
  const { refetch: refetchAllDiscountCodes } = useGetAllDiscountCodesQuery({})

  const dispatch = useDispatch()

  const toggle = () => {
    form.resetFields()
    dispatch(toggleModal(MODAL_STATE.CREATE_DISCOUNT_MODAL))
  }
  const Configuration = useSelector(selectConfiguration)

  const handleCreateDiscountCode = async (values: IValuesTypes) => {
    try {
      const { code, ...otherValues } = values
      const upperCasedCode = code

      await createDiscountCode({
        code: upperCasedCode,
        ...otherValues,
      }).unwrap()
      message.success("New discount coupon code created successfully!")
      refetchAllDiscountCodes()
      toggle()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <ModalComponent
        open={Configuration[MODAL_STATE.CREATE_DISCOUNT_MODAL]}
        onCancel={toggle}
        modalTitle="Create Discount Coupon"
      >
        <Form
          className="p-5 w-full bg-white"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleCreateDiscountCode}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[
              { required: true, message: "Please input the coupon code!" },
            ]}
          >
            <Input
              placeholder="Enter coupon code.."
              className="w-full"
              minLength={6}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            label="Discount Type"
            name="discountType"
            rules={[{ required: true, message: "Please input discount type!" }]}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value="percentage">Percentage</Select.Option>
              <Select.Option value="number">Number</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Discount value" name="discountValue" required>
            <Input placeholder="Enter discount value.." className="w-full" />
          </Form.Item>

          <Form.Item label="Special Discount" name="specialDiscount" required>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value={true}>YES</Select.Option>
              <Select.Option value={false}>NO</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Usage Limit"
            name="usageLimit"
            rules={[{ required: true, message: "Please input usage limit!" }]}
          >
            <Input
              placeholder="Enter usage limit.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Minimum price to avail discount"
            name="minimumPriceToAvail"
            rules={[
              {
                required: true,
                message: "Please input minimum price to avail discount!",
              },
            ]}
          >
            <Input
              placeholder="Enter minimum price to avail discount.."
              type="number"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Active status"
            name="active"
            rules={[
              {
                required: true,
                message: "Please input minimum price to avail discount!",
              },
            ]}
          >
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Discount Type"
            >
              <Select.Option value={true}>ACTIVE</Select.Option>
              <Select.Option value={false}>INACTIVE</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full bg-secondary"
              type="primary"
              htmlType="submit"
              loading={false}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default CreateDiscount
