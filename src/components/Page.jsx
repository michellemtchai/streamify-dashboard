function Page({ children }) {
  return (
    <main className="bg-slate-200 min-h-screen flex flex-col">
      <header className="w-full bg-black">
        <h1 className="text-white m-auto w-4/5 max-w-5xl text-3xl font-bold py-2">
          Streamify
        </h1>
      </header>
      <article className="flex-1 w-4/5 m-auto max-w-5xl py-6 h-full flex flex-col">
        {children}
      </article>
      <footer className="w-full bg-black">
        <p className="text-white m-auto w-4/5 max-w-5xl py-2">
          Streamify © 2024
        </p>
      </footer>
    </main>
  );
}

export default Page;
