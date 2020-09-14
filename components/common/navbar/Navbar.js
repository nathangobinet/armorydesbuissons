/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import Link from 'next-translate/Link';
import { Navbar as BootstrapNavBar, Container, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';

import useTranslation from 'next-translate/useTranslation';
import NavIcon from './NavIcon';
import { setDarkMode } from '../../../helpers/theme';
import { removeLangFromPath, setLanguage } from '../../../helpers/language';
import { handleScroll, handleToggle } from './toggleNav';

import logo from '../../../public/svgs/nav/logo-white.svg';
import englishFlag from '../../../public/svgs/nav/usa.svg';
import frenchFlag from '../../../public/svgs/nav/fr.svg';
import { toogleUserPopper, UserTooltip } from './UserTooltip';

const icons = [
  {
    type: 'fa',
    label: 'Language',
    class: 'fa-globe',
    subs: [
      {
        type: 'image',
        label: 'English',
        alt: 'English flag',
        obj: englishFlag,
        func: () => setLanguage('en'),
      }, {
        type: 'image',
        label: 'French',
        alt: 'French flag',
        obj: frenchFlag,
        func: () => setLanguage('fr'),
      },
    ],
  }, {
    type: 'fa',
    label: 'Theme',
    class: 'fa-adjust',
    subs: [
      {
        type: 'fa',
        label: 'Dark',
        class: 'fa-moon',
        func: () => setDarkMode(true),
      }, {
        type: 'fa',
        label: 'Light',
        class: 'fa-sun',
        func: () => setDarkMode(false),
      },
    ],
  }, {
    type: 'fa',
    label: 'User',
    class: 'fa-user',
    id: 'nav-user-button',
    func: () => toogleUserPopper('nav-user-button'),
  },
];

function Navbar({ transparent }) {
  const { t } = useTranslation();
  const navRef = useRef();
  const router = useRouter();

  useEffect(() => {
    handleScroll(transparent);
  }, []);

  const isActive = (pathToBeActive) => (
    (removeLangFromPath(router.pathname) === pathToBeActive)
      ? 'active'
      : ''
  );

  return (
    <div>
      <BootstrapNavBar
        ref={navRef}
        id="navbar"
        expand="lg"
        fixed="top"
        style={{ padding: 0, backgroundColor: (transparent) ? 'transparent' : '#2B2B2B' }}
        onToggle={(isToggle) => handleToggle(isToggle, navRef.current, transparent)}
      >
        <Container fluid="lg">
          <Link href="/">
            <a>
              <BootstrapNavBar.Brand className="opacity-interaction">
                <img src={logo} width="100" alt="Armory des buissons logo" />
              </BootstrapNavBar.Brand>
            </a>
          </Link>
          <BootstrapNavBar.Toggle aria-controls="basic-navbar-nav" className="nav-py px-4 opacity-interaction">
            <i style={{ lineHeight: 1.4 }} className="fa fa-bars text-white" />
          </BootstrapNavBar.Toggle>
          <BootstrapNavBar.Collapse id="basic-navbar-nav" className="nav-header">
            <div className="text-center text-lg-left p-0 m-auto">
              <Nav>
                <Link href="/">
                  <a className={`nav-py nav-menu nav-item nav-link ${isActive('/')}`}>
                    {t('common:pages.home')}
                  </a>
                </Link>
                <Link href="/live">
                  <a className={`nav-py nav-menu nav-item nav-link ${isActive('/live')}`}>
                    {t('common:pages.live')}
                  </a>
                </Link>
                <Link href="/about">
                  <a className={`nav-py nav-menu nav-item nav-link ${isActive('/about')}`}>
                    {t('common:pages.about')}
                  </a>
                </Link>
                <Link href="/shop">
                  <a className={`nav-py nav-menu nav-item nav-link ${isActive('/shop')}`}>
                    {t('common:pages.shop')}
                  </a>
                </Link>
              </Nav>
            </div>
            <div className="pb-3 pt-2 py-lg-0">
              <Nav className="d-flex align-items-center justify-content-center flex-row">
                {icons.map((icon) => <NavIcon key={icon.label} icon={icon} subIcons={icon.subs} />)}
              </Nav>
            </div>
          </BootstrapNavBar.Collapse>
        </Container>
      </BootstrapNavBar>
      <UserTooltip />
      { !transparent && <div className="nav-offset" /> }
    </div>
  );
}

export default Navbar;
