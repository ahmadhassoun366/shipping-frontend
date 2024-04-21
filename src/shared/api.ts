const _baseUrl = process.env.NEXT_BACKEND_API_URL;

const api = {
  baseUrl: _baseUrl,

  user: {
    balance: (address: string) =>
      `${_baseUrl}/balanceOf/?userAddress=${address}`,
    //http://localhost:5000/signup
    //  Body {
    // "name": "ahmad",
    // "email": "ahmad@gmail.com",
    // "password": "test",
    // "type": "Importer"}
    signup: () => `http://localhost:5000/signup`,
    signin: () => `http://localhost:5000/signin`,
  },
};

export default api;
