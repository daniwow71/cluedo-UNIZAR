import { useState } from 'react';
import { userSchema } from '../schemas/schemas';

const useRegisterPage = () => {

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const validationResult = userSchema.validateRegisterUser(data);

    if (!validationResult.success) {
      setErrors(validationResult.error.formErrors.fieldErrors);
      return;
    }
    setErrors({});
    console.log('Usuario registrado:', data);
  }

  /*const postUser = async (data) => {
    return await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const validationResult = userSchema.validateRegisterUser(data);

    console.log(validationResult);
    if (!validationResult.success) {
      setErrors(validationResult.error.formErrors);
      return;
    }
    setErrors({});
    try {
      const response = await postUser(data);
      if (response.error) {
        setErrors({ serverError: response.error });
        return;
      }
      console.log('Usuario registrado:', response);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrors({ serverError: 'Error al registrar el usuario' });
    }
  }; */

  return {
    errors,
    handleSubmit,
  }
}

export default useRegisterPage;