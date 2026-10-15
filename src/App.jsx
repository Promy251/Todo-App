import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="page">
      <section className="starter-card">
        <div className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          React JavaScript starter
        </div>

        <h1>
          Build something
          <br />
          <span>great.</span>
        </h1>
        <p className="intro">
          Your React app is ready. Make a change, save the file, and see it
          update instantly.
        </p>

        <div className="counter-panel">
          <div>
            <p className="counter-label">Clicks so far</p>
            <p className="counter-value" aria-live="polite">
              {count}
            </p>
          </div>
          <button
            className="counter-button"
            onClick={() => setCount((current) => current + 1)}
          >
            Count up <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="quick-start">
          <h2>Quick start</h2>
          <ol>
            <li>
              Edit <code>src/App.jsx</code> to build your app.
            </li>
            <li>
              Add styles in <code>src/style.css</code>.
            </li>
            <li>Your changes appear here as you work.</li>
          </ol>
        </div>

        <footer className="resource-links">
          <a href="https://react.dev/learn" target="_blank" rel="noreferrer">
            React docs <span aria-hidden="true">↗</span>
          </a>
          <a href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
            Vite docs <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </section>
    </main>
  );
}

export default App;
