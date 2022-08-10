import React, { useState, useRef } from 'react';
import Router from 'next/router';

const ResetButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>();
  const [spin, setSpin] = useState('');

  const handleButtonAnimation = () => {
    buttonRef.current.blur();
    setSpin('spin');
    setTimeout(() => {
      setSpin('');
    }, 500);
  };

  const handleClick = () => {
    handleButtonAnimation();
    Router.reload();
  };

  return (
    <button
      ref={buttonRef}
      className="reset-button"
      aria-label="Reset test"
      onClick={handleClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${spin}`}
      >
        <polyline points="1 4 1 10 7 10"></polyline>{' '}
        <polyline points="23 20 23 14 17 14"></polyline>{' '}
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
      </svg>
    </button>
  );
};

export default ResetButton;
