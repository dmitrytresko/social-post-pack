import { PostGenerator } from './features/PostGenerator';
import { SectionHeading } from './components/SectionHeading';

function App() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading
        level={1}
        label="creative generator"
        title="Social Post Pack"
      />
      <p className="mt-3 max-w-prose text-muted">
        Turn one product image and a reference scene into three ready-to-post
        creatives. Upload a product and one or two reference scenes to start.
      </p>

      <PostGenerator />
    </main>
  );
}

export default App;
