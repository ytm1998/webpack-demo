import React, { useState } from 'react';
import { Counter } from '@components/Counter';
import { ImageGallery } from '@components/ImageGallery';
import logo from '@assets/logo.svg';

import './App.scss';

const App: React.FC = () => {
  const [title] = useState('React + Webpack + TypeScript');

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />
        <h1>{title}</h1>
        <p>这是一个集成了 React、TypeScript、Sass 和图片支持的 Webpack 项目</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>计数器示例</h2>
          <Counter />
        </section>

        <section className="section">
          <h2>图片示例</h2>
          <ImageGallery />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with Webpack + React + TypeScript</p>
      </footer>
    </div>
  );
};

export default App;
