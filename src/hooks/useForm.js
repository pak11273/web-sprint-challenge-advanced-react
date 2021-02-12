import * as yup from "yup";

import { schema } from "../schema";
import { useState } from "react";

// write your custom hook here to control your checkout form
export const useForm = (state) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [values, setValues] = useState(state);
  const [disabled, setDisabled] = useState(true);
  let initialErrors = {};
  for (let prop in state) {
    initialErrors[prop] = "";
  }
  const [errors, setErrors] = useState(initialErrors);

  const handleChanges = (e) => {
    const { name } = e.target;
    // yup.reach({
    //   values,
    //   name,
    // });
    // schema
    //   .isValid(values)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(values);
    console.log(errors);
    e.preventDefault();
    let valid = await schema.isValid(values);
    console.log("valid: ", valid);
    console.log("show: ", showSuccessMessage);
    if (valid) {
      setShowSuccessMessage(true);
    }
  };

  return [values, handleChanges, handleSubmit, showSuccessMessage, disabled];
};
