import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import hector from '../../public/images/team/avatar-hector.jpg';
import jpat from '../../public/images/team/avatar-jpat.jpg';
import jezah from '../../public/images/team/avatar-jezah.jpg';

function Profile(props) {
  const {
    image, name, title, text,
  } = props;
  return (
    <div className="p-3" style={{ flex: '1 1 0' }}>
      <img className="rounded-circle mx-auto d-block" alt={name} src={image} width="200px" />
      <h4 className="text-primary text-center mt-3 mb-0">{name}</h4>
      <div className="text-accent text-center mb-4"><b>{title}</b></div>
      <p className="text-center">{text}</p>
    </div>
  );
}

export default function Team() {
  const { t } = useTranslation('common');
  return (
    <section id="team" className="container py-5">
      <div className="py-4">
        <h1 className="text-center">{t('about.team.title')}</h1>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between pt-4">
          <Profile image={hector} name="Hector" title={t('about.team.hector.title')} text={t('about.team.hector.text')} />
          <Profile image={jpat} name="J-Pat" title={t('about.team.jpat.title')} text={t('about.team.jpat.text')} />
          <Profile image={jezah} name="Jezah" title={t('about.team.jezah.title')} text={t('about.team.jezah.text')} />
        </div>
      </div>
    </section>
  );
}
