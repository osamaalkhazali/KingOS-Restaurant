import { useEffect } from 'react';
import { useAuth, authenticateUser } from '../../context/authContext'; // Import your authentication context
import { useLocation, Outlet, Navigate  } from 'react-router-dom';


const ProtectedRoute = ({requiredPositions = []}) => {
  
  const { isAuthenticated, logout , user  } = useAuth();
  const location = useLocation();


useEffect(() => {
    const checkUser = async () => {
      const checkedUser = await authenticateUser();
      checkedUser ?? logout();
    };
    checkUser();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);


  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!requiredPositions.includes(user.position)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
  

};

export default ProtectedRoute;
