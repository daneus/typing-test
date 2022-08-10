import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">
        <span className="first-word">Typing</span>
        <span className="second-word">Test</span>
      </h1>
      <p className="subtitle">
        Test out your typing speed with this online tool!
      </p>
    </header>
  );
};

export default Header;
