import { GeneratorSection } from './sections/GeneratorSection';

function App() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-accent">$ social-post-pack</p>
      <h1 className="mt-2 text-3xl font-bold">Social Post Pack</h1>
      <p className="mt-3 max-w-prose text-muted">
        Turn one product image and a reference scene into three ready-to-post
        creatives. Upload a product and one or two reference scenes to start.
      </p>

      <GeneratorSection />
    </main>
  );
}

export default App;
