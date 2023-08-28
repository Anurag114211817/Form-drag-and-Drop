// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// type FormData = {
//   input1: string,
//   input2: string
// }

type FormState = {
  formData: /* FormData[] | */ Record<string, string>[],
}

const initialState: FormState = {
  formData: [{
    input1: '',
    input2: ''
  }],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<{idx: number, name: string, value: string}>) {
      let { idx, name, value } = action.payload;
      state.formData[idx][name] = value;
    },
    addField (state) {
      state.formData.push({input1: '', input2: ''})
    }
  },
});

export const { setData, addField } = formSlice.actions;
export default formSlice.reducer;