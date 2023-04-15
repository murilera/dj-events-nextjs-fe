const { API_URL } = require("@/config");
const { useRouter } = require("next/router");
const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (user) => {
    console.log(user)
  }

  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password })
  }

  const logout = async () => {
    console.log('logout')
  }

  const checkUserLoggedIn = async (user) => {
    console.log(user)
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext