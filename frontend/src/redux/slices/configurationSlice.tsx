import { createSlice } from "@reduxjs/toolkit";
import { MODAL_STATE } from "../../common/states";

interface ConfigurationState {
  [MODAL_STATE.CREATE_PRODUCT_MODAL]: boolean;
  [MODAL_STATE.UPDATE_PRODUCT_MODAL]: boolean;
  [MODAL_STATE.UPDATE_USER_MODAL]: boolean;
  [MODAL_STATE.CHANGE_ORDER_STATUS]: boolean;
  [MODAL_STATE.CREATE_DISCOUNT_MODAL]: boolean;
  [MODAL_STATE.UPDATE_DISCOUNT_MODAL]: boolean;
  product: null; // Replace `any` with the actual type of your product if you have one
}

const initialState: ConfigurationState = {
  [MODAL_STATE.CREATE_PRODUCT_MODAL]: false,
  [MODAL_STATE.UPDATE_PRODUCT_MODAL]: false,
  [MODAL_STATE.UPDATE_USER_MODAL]: false,
  [MODAL_STATE.CHANGE_ORDER_STATUS]: false,
  [MODAL_STATE.CREATE_DISCOUNT_MODAL]: false,
  [MODAL_STATE.UPDATE_DISCOUNT_MODAL]: false,
  product: null,
};

const slice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    toggleModal: (state, { payload: modalState }) => {
      switch (modalState) {
        case MODAL_STATE.CREATE_PRODUCT_MODAL:
          state[MODAL_STATE.CREATE_PRODUCT_MODAL] = !state[MODAL_STATE.CREATE_PRODUCT_MODAL];
          break;
          case MODAL_STATE.UPDATE_USER_MODAL:
          state[MODAL_STATE.UPDATE_USER_MODAL] = !state[MODAL_STATE.UPDATE_USER_MODAL];
          break;
        case MODAL_STATE.UPDATE_PRODUCT_MODAL:
          state[MODAL_STATE.UPDATE_PRODUCT_MODAL] = !state[MODAL_STATE.UPDATE_PRODUCT_MODAL];
          break;
          case MODAL_STATE.CHANGE_ORDER_STATUS:
            state[MODAL_STATE.CHANGE_ORDER_STATUS] = !state[MODAL_STATE.CHANGE_ORDER_STATUS];
            break;
        case MODAL_STATE.CREATE_DISCOUNT_MODAL:
          state[MODAL_STATE.CREATE_DISCOUNT_MODAL] = !state[MODAL_STATE.CREATE_DISCOUNT_MODAL];
          break;
          case MODAL_STATE.UPDATE_DISCOUNT_MODAL:
            state[MODAL_STATE.UPDATE_DISCOUNT_MODAL] = !state[MODAL_STATE.UPDATE_DISCOUNT_MODAL];
            break;  
        default:
          break;
      }
    },
  },
});

export const { toggleModal } = slice.actions;
export const selectConfiguration = (state: {configuration: ConfigurationState}) => state.configuration;
export default slice.reducer;
