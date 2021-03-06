import { FORM_INPUT_UPDATE } from '../../components/UI/Input';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };

      const updateValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };

      let updatedFormIsValid = true;
      for (const key in updateValidities) {
        updatedFormIsValid = updatedFormIsValid && updateValidities[key];
      }

      return {
        formIsValid: updatedFormIsValid,
        inputValues: updatedValues,
        inputValidities: updateValidities,
      }  
    }
    default: {
      return state;
    }
  }
}

export default formReducer;