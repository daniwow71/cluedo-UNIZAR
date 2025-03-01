const API_URL = 'http://localhost:3000';

export const registerUser = async (data) => {
  return await fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
}