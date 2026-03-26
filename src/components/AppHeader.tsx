import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppRoutes from '@/src/route';
import { AuthorizationStatus } from '@/src/const/authorization';
import type { RootState, AppDispatch } from '@/src/store';
import { logout } from '@/src/store/action';

type AppHeaderProps = {
  logoLinkActive?: boolean;
  favoritesCount: number;
};

const AppHeader = ({ logoLinkActive = false, favoritesCount }: AppHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((s: RootState) => s.authorizationStatus);
  const user = useSelector((s: RootState) => s.user);

  const logoClass = logoLinkActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={logoClass} to={AppRoutes.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && user ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="header__avatar user__avatar"
                          src={user.avatarUrl}
                          width="54"
                          height="54"
                          alt=""
                        />
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#signout"
                      onClick={(e) => {
                        e.preventDefault();
                        void dispatch(logout());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoutes.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
