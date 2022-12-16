import { useState, ChangeEvent, useEffect, useMemo } from "react";

export const useForm = <T extends Object>(
  initialForm: T,
  formValidations: {
    [key: string]: [(value: string) => boolean, string];
  } = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState(
    {} as { [key: string]: string | null }
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  /* It's checking if the form is valid. */
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  /**
   * When the input changes, update the state of the form with the new value of the input.
   */
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState, // maintain state of other form fields
      [name]: value, // update state of field that is changed
    });
  };

  /**
   * It resets the form to its initial state.
   */
  const onResetForm = () => {
    setFormState(initialForm);
  };

  /**
   * We loop through the formValidations object, and for each key, we get the value, which is an array
   * of two items. The first item is a function that takes a value and returns a boolean. The second
   * item is an error message. We then check if the formState object has the key that we're currently
   * looping through, and if it does, we get the value of that key. We then call the function that we
   * got from the array, passing in the value that we got from the formState object. If the function
   * returns true, we set the value of the key in the formCheckedValues object to null. If the function
   * returns false, we set the value of the key in the formCheckedValues object to the error message
   * that we got from the array
   */
  const createValidators = () => {
    const formCheckedValues: {
      [key: string]: string | null;
    } = {};
    for (const formFieldName of Object.keys(formValidations)) {
      const [fn, errorMessage = "Validation error"] =
        formValidations[formFieldName];
      const valueToCheck =
        formState.hasOwnProperty(formFieldName) &&
        (formState as any)[formFieldName];
      formCheckedValues[`${formFieldName}Valid`] = fn(valueToCheck)
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState, // for return every form control of state
    formState,
    onInputChange,
    onResetForm,
    formValidation,
    isFormValid,
  };
};
