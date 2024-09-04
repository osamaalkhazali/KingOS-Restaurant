import { createContext ,useReducer , useContext} from "react";
import axios from 'axios';

export const AuthContext = createContext("");

const storedToken = localStorage.getItem('accessToken');



const authenticateUser = async (token) => {
  try {
    const response = await axios.get(`http://localhost:4000/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (response.data.error) {
      console.log('Authentication Error:', response.data.error);
      return null; 
    } else {
      return response.data.user;
    }
  } catch (error) {
    console.error('An error occurred during authentication:', error);
    return null; 
  }
};

const userChecker = async () => {
  let initialState = {
    user: {
      username: null,
      id: null,
      position : null
    },
    isAuthenticated: false,
  };

  if (storedToken) {
    const authenticatedUser = await authenticateUser(storedToken);

    if (authenticatedUser) {
      initialState = {
        user: authenticatedUser,
        isAuthenticated: true,
      };
    }
  }

  return initialState;
};

const initialState = await userChecker();


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state)

  
  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: { user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth , authenticateUser };