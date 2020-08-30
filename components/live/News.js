/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import marked from 'marked';
import { useTranslation, i18n } from '../../helpers/i18n';

import styles from '../../styles/Live.module.css';

export default function News({ news, fullWidth, setToggle }) {
  const [language, setLanguage] = useState(i18n.language);

  i18n.on('languageChanged', (newLanguage) => { setLanguage(newLanguage); });
  const { t } = useTranslation('common');

  return (
    <div
      className="card bg-darker"
      style={{
        position: fullWidth ? 'absolute' : 'initial',
        height: fullWidth ? 'calc(100% - 100px)' : '100%',
        width: fullWidth ? 'calc(100% - 50px)' : '100%',
      }}
    >
      <div className="h-100 d-flex flex-column justify-content-between">
        <div className="h-100" style={{ overflow: (fullWidth) ? 'auto' : 'hidden' }}>
          <h5 className="text-accent">{news ? news.content[language].title : ''}</h5>
          <p dangerouslySetInnerHTML={{ __html: news ? marked(news.content[language].text) : '' }} className={(!fullWidth) ? styles.truncateNews : ''} />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <small className="text-muted">{news ? (new Date(news.date)).toLocaleDateString() : ''}</small>
          {!fullWidth && (
            <button
              type="button"
              className="btn-link"
              onClick={() => { setToggle(news.id); }}
            >
              {t('live.news.more')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
