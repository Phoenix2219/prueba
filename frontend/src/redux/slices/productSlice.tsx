import { createSlice } from '@reduxjs/toolkit'

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  productImages: string[];
  ratings: string[];
}

interface EventState {
  product: Product | null;
}

const initialState: EventState = {
    product: null,
}

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    setProduct: (state, action) => {
      const { data } = action.payload
      return { ...state, product: data }
    },
  },
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer

export const selectProduct = (state: {product: EventState}) => state.product.product
