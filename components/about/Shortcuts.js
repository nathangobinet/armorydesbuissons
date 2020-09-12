import React from 'react';
import useTranslation from 'next-translate/useTranslation';

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
      <div className="text-center py-5"><h1 className="text-accent">{t('common:about.shortcut.title')}</h1></div>
      <table className={`table ${styles['shortcuts-table']} mb-4`}>
        <tbody>
          <Shortcut shortcut="Y" description={t('common:about.shortcut.shortcuts.y')} />
          <Shortcut shortcut="F" description={t('common:about.shortcut.shortcuts.f')} />
          <Shortcut shortcut="H" description={t('common:about.shortcut.shortcuts.h')} />
          <Shortcut shortcut="Space" description={t('common:about.shortcut.shortcuts.space')} />
          <Shortcut shortcut="Shift + H" description={t('common:about.shortcut.shortcuts.shifth')} />
          <Shortcut shortcut="Ctrl + H" description={t('common:about.shortcut.shortcuts.ctrlh')} />
          <Shortcut shortcut="F1" description={t('common:about.shortcut.shortcuts.f1')} />
          <Shortcut shortcut="F2" description={t('common:about.shortcut.shortcuts.f2')} />
          <Shortcut shortcut="F3" description={t('common:about.shortcut.shortcuts.f3')} />
          <Shortcut shortcut="F4" description={t('common:about.shortcut.shortcuts.f4')} />
          <Shortcut shortcut="F6" description={t('common:about.shortcut.shortcuts.f6')} />
          <Shortcut shortcut="F7" description={t('common:about.shortcut.shortcuts.f7')} />
          <Shortcut shortcut="F8" description={t('common:about.shortcut.shortcuts.f8')} />
        </tbody>
      </table>
    </section>
  );
}
