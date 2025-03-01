import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../schemas/schemas';
import { loginUser } from '../services/User';

const useLoginPage = (setUser) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const validationResult = userSchema.validateLoginUser(data);

      if (!validationResult.success) {
        setErrors(validationResult.error.formErrors.fieldErrors);
        return;
      }
      console.log('Datos de inicio de sesión:', data);
      const response = await loginUser(data);

      if (response.error) {
        console.error('Error en inicio de sesión:', response.error);
        return
      }
      setUser(response.user);
      navigate('/');
    }
    catch (error) {
      console.error('Error en inicio de sesión:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    errors,
    isLoading,
    handleSubmit
  };
};

export default useLoginPage;