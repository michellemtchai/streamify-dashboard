import React from 'react';

function Page({ children }) {
  return (
    <main
      data-testid="page"
      className="bg-slate-200 min-h-screen flex flex-col"
    >
      <header data-testid="header" className="w-full bg-black">
        <h1
          data-testid="header-text"
          className="text-white m-auto w-4/5 max-w-5xl text-3xl font-bold py-2"
        >
          Streamify
        </h1>
      </header>
      <article
        data-testid="main-article"
        className="flex-1 w-4/5 m-auto max-w-5xl py-6 h-full flex flex-col"
      >
        {children}
      </article>
      <footer data-testid="footer" className="w-full bg-black">
        <p
          data-testid="footer-text"
          className="text-white m-auto w-4/5 max-w-5xl py-2"
        >
          Streamify © 2024
        </p>
      </footer>
    </main>
  );
}

export default Page;
