/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Trans from 'next-translate/Trans';
import Footer from '../components/common/footer/Footer';
import Navbar from '../components/common/navbar/Navbar';

export default function Legals() {
  const ARMORY_URL = 'https://www.armorydesbuissons.fr';
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <h1><Trans i18nKey="legals:title" /></h1>
        <p><Trans i18nKey="legals:preamble" components={[<a href={ARMORY_URL} />]} /></p>
        <h3><Trans i18nKey="legals:hosting.title" /></h3>
        <ul>
          <li><Trans i18nKey="legals:hosting.hosting" /></li>
          <li><Trans i18nKey="legals:hosting.adress" /></li>
          <li><Trans i18nKey="legals:hosting.phone" /></li>
          <li><Trans i18nKey="legals:hosting.website" components={[<a href="https://www.ovh.com" />]} /></li>
        </ul>
        <h3><Trans i18nKey="legals:terms.title" /></h3>
        <p><Trans i18nKey="legals:terms.text" components={[<a href={ARMORY_URL} />]} /></p>
        <h3><Trans i18nKey="legals:cookies.title" /></h3>
        <p><Trans i18nKey="legals:cookies.text" components={[<a href={ARMORY_URL} />]} /></p>
        <h3><Trans i18nKey="legals:links.title" /></h3>
        <p><Trans i18nKey="legals:links.p1" /></p>
        <p><Trans i18nKey="legals:links.p2" /></p>
        <p><Trans i18nKey="legals:links.p3" /></p>
        <h3><Trans i18nKey="legals:intellectual.title" /></h3>
        <p><Trans i18nKey="legals:intellectual.p1" components={[<a href={ARMORY_URL} />]} /></p>
        <p><Trans i18nKey="legals:intellectual.p2" /></p>
        <h3><Trans i18nKey="legals:data.title" /></h3>
        <p><Trans i18nKey="legals:data.p1" components={[<a href={ARMORY_URL} />]} /></p>
        <p><Trans i18nKey="legals:data.p2" /></p>
        <p><Trans i18nKey="legals:data.p3" /></p>
        <p><Trans i18nKey="legals:data.p4" /></p>
        <p><Trans i18nKey="legals:data.p5" /></p>
      </div>
      <Footer />
    </div>
  );
}
