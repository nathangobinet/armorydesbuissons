/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar as BootstrapNavBar, Container, Nav } from 'react-bootstrap';

import NavIcon from './NavIcon';
import { setDarkMode } from '../../../helpers/theme';
import { setLanguage } from '../../../helpers/language';
import { handleScroll, handleToggle } from './toggleNav';

import logo from '../../../public/svgs/nav/logo-white.svg';
import englishFlag from '../../../public/svgs/nav/usa.svg';
import frenchFlag from '../../../public/svgs/nav/fr.svg';
import { useTranslation } from '../../../helpers/i18n';

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
  },
];

function Navbar({ transparent }) {
  const { t } = useTranslation('common');
  const navRef = useRef();
  useEffect(() => {
    handleScroll(transparent);
  }, []);
  return (
    <div>
      <BootstrapNavBar
        ref={navRef}
        id="navbar"
        expand="lg"
        fixed="top"
        className="p-0"
        onToggle={(isToggle) => handleToggle(isToggle, navRef.current)}
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
            <i style={{ lineHeight: 1.1 }} className="fa fa-bars text-white" />
          </BootstrapNavBar.Toggle>
          <BootstrapNavBar.Collapse id="basic-navbar-nav" className="nav-header">
            <div className="text-center text-lg-left p-0 m-auto">
              <Nav>
                <Link href="/"><a className="nav-py nav-menu nav-item nav-link active">{t('pages.home')}</a></Link>
                <Link href="/live"><a className="nav-py nav-menu nav-item nav-link">{t('pages.live')}</a></Link>
                <Link href="/about"><a className="nav-py nav-menu nav-item nav-link">{t('pages.about')}</a></Link>
                <Link href="/vip"><a className="nav-py nav-menu nav-item nav-link">{t('pages.vip')}</a></Link>
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
      { !transparent && <div className="nav-offset" /> }
    </div>
  );
}

export default Navbar;
