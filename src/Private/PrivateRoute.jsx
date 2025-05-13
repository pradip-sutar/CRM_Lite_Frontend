import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import crmStore from "../Utils/crmStore";

const PrivateRoute = () => {
  const [accessToken, setAccessToken] = useState(
    crmStore.getState().user.userInfo.access_token
  );

  useEffect(() => {
    const unsubscribe = crmStore.subscribe(() => {
      const newToken = crmStore.getState().user.userInfo.access_token;
      setAccessToken(newToken);
    });

    return () => unsubscribe();
  }, []);

  

  return accessToken ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
