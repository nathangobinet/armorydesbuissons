import React from 'react';
import { useTranslation } from '../../helpers/i18n';

import styles from '../../styles/About.module.css';

function Shortcut({ shortcut, description }) {
  return (
    <tr>
      <td className="d-flex justify-content-between align-items-center">
        <kbd className={styles['key-bigger']}>{shortcut}</kbd>
        <span className="text-right">{description}</span>
      </td>
    </tr>
  );
}

export default function Shortcuts() {
  const { t } = useTranslation('common');
  return (
    <section id="shortcuts" className="container py-5">
      <div className="text-center py-5"><h1 className="text-accent">{t('about.shortcut.title')}</h1></div>
      <table className={`${styles['shortcuts-table']} mb-4`}>
        <tbody>
          <Shortcut shortcut="F3" description={t('about.shortcut.shortcuts.f3')} />
          <Shortcut shortcut="F2" description={t('about.shortcut.shortcuts.f2')} />
          <Shortcut shortcut="Y" description={t('about.shortcut.shortcuts.y')} />
          <Shortcut shortcut="Space" description={t('about.shortcut.shortcuts.space')} />
          <Shortcut shortcut="Shift + H" description={t('about.shortcut.shortcuts.shifth')} />
          <Shortcut shortcut="F1" description={t('about.shortcut.shortcuts.f1')} />
          <Shortcut shortcut="F4" description={t('about.shortcut.shortcuts.f2')} />
          <Shortcut shortcut="F7" description={t('about.shortcut.shortcuts.f3')} />
          <Shortcut shortcut="F" description={t('about.shortcut.shortcuts.f')} />
        </tbody>
      </table>
    </section>
  );
}
