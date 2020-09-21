import React, { useState, useRef, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';

export default function DynamicInput({ setFilter, className, style }) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setFilter(text);
    }, 300);
  }, [text, setFilter]);

  return (
    <input
      className={`input ${className || ''}`}
      value={text}
      style={style}
      type="text"
      placeholder={t('common:search')}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
