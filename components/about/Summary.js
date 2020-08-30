/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

import screenLogo from '../../public/svgs/screen-logo.svg';

export default function Summary() {
  return (
    <section id="summary" className="container py-5">
      <div className="row py-4">
        <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-end">
          <div className="pb-4 pb-mb-0 pr-md-5 pr-0">
            <img className="img-fluid mb-3" src={screenLogo} alt="Armory des buissons logo" width="350" height="350" />
            <div className="text-center">
              <a className="btn btn-accent mr-2 my-1" href="steam://run/107410//-connect=164.132.203.207%20-port=2302">
                <i className="fas fa-gamepad mr-1" />
                Connect
              </a>
              <Link href="/#tp-into-fight">
                <a className="btn btn-primary my-1">
                  <i className="fas fa-star mr-1" />
                  All the features
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div>
            <h1 className="text-center text-md-left">About our Arma 3 server</h1>
            <p>This section invites you to:</p>
            <ol>
              <a href="#rules"><li>Know the rules</li></a>
              <a href="#team"><li>Meet our team</li></a>
              <a href="#contact"><li>Contact us</li></a>
              <a href="#rank"><li>Understand the ranking system</li></a>
              <a href="#vip"><li>Help us finance the server</li></a>
              <a href="#shortcuts"><li>Know all the shortcuts</li></a>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
