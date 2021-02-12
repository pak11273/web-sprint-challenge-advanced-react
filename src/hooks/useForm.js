import * as yup from "yup";

import { useEffect, useState } from "react";

import { schema } from "../schema";

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

  useEffect(() => {
    schema
      .isValid(values)
      .then((valid) => {
        if (valid) {
          setDisabled(false);
          setShowSuccessMessage(true);
        } else if (!valid) {
          setDisabled(true);
          setShowSuccessMessage(false);
        }
      })
      .catch((e) => console.log("e: ", e));
    console.log("val: ", values);
  }, [values]);

  const handleChanges = async (e) => {
    const { name } = e.target;
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = await schema.isValid(values);
    if (valid) {
      setShowSuccessMessage(true);
    }
  };

  return [values, handleChanges, handleSubmit, showSuccessMessage, disabled];
};
