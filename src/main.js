import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="min-h-screen px-6 py-12">
    <div class="mx-auto max-w-3xl space-y-10">
      <header class="space-y-3">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Datingsim Ultra</p>
        <h1 class="text-4xl font-semibold text-white sm:text-5xl">Tailwind CSS is live</h1>
        <p class="text-base text-slate-300 sm:text-lg">
          Start building your UI with utility classes. Edit <strong>src/main.js</strong> and
          <strong>src/style.css</strong> to see changes instantly.
        </p>
      </header>

      <section class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-semibold">Fast styling</h2>
          <p class="mt-2 text-sm text-slate-400">
            Combine utilities for spacing, typography, colors, and layout.
          </p>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-semibold">Customizable</h2>
          <p class="mt-2 text-sm text-slate-400">
            Update <strong>tailwind.config.js</strong> to extend your design system.
          </p>
        </div>
      </section>

      <button
        class="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
        type="button"
      >
        Start building
      </button>
    </div>
  </main>
`
