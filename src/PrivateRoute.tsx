import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppRoutes from '@/src/route';
import { AuthorizationStatus } from '@/src/const/authorization';
import type { RootState } from '@/src/store';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element | null {
  const authorizationStatus = useSelector((s: RootState) => s.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }
  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoutes.Login} replace />;
  }
  return children;
}

export default PrivateRoute;
