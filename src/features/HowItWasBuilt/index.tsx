import { Accordion } from '../../components/Accordion';
import { TIME_BREAKDOWN, TOOLSET } from './constants';

export function HowItWasBuilt() {
  return (
    <section
      id="how-it-was-built"
      aria-label="How it was built"
      className="mt-14 border-t border-border pt-10"
    >
      <Accordion label="the process" title="How it was built">
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Approach & key decisions
            </h3>
            <p className="max-w-prose text-sm leading-relaxed">
              It runs in two stages. Claude goes first as the creative director:
              it looks at the product and the reference images, then hands back
              a plan - basically where the product should be placed, the
              headline and CTA, and an accent color. Then Gemini takes that plan
              and generates the real scene with the product dropped into it,
              once for each format. At the end, Canvas draws the copy on top and
              exports the PNG.
            </p>
            <p className="max-w-prose text-sm leading-relaxed">
              The split between models is on purpose. My observation is that
              image models are great at dropping a product into a scene with
              believable light and shadow, but pretty bad at rendering readable
              text. So I let Gemini handle the visuals and kept every word on
              the Canvas layer, where it looks sharp. Claude also picks where
              the copy goes, always on the opposite side from the product, and
              the canvas samples the colors behind it to drop in a soft scrim so
              the text stays readable whatever the scene looks like.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              How I used AI
            </h3>
            <p className="max-w-prose text-sm leading-relaxed">
              I stayed close to the planning side and got everything set up
              before any real coding started: the architecture, the conventions,
              and guidelines the assistant had to follow. Once that was in place
              I let it handle most of the actual building, and I reviewed and
              corrected as we went.
            </p>
            <p className="max-w-prose text-sm leading-relaxed">
              Where I really stepped in was the direction. Early on it wanted to
              place the product with plain Canvas compositing, but I could tell
              that would end up looking pasted on top of the image without any
              real integration into the scene context; so I scrapped it and
              moved the whole thing over to an image model instead, which is
              what made the results actually feel real. The prompts were the
              other part I owned. The first scenes kept splitting the frame in
              half with a flat band of color, and what finally fixed it was
              flipping the approach around: describing the one scene I wanted,
              rather than listing everything it shouldn't do.
            </p>
            <p className="max-w-prose text-sm leading-relaxed">
              Another thing I kept tweaking was how the product sat in the
              scene. At first it floated on top, and what helped was giving the
              model more room to ground it and adjust the surroundings so it
              actually belonged there.
            </p>
            <p className="max-w-prose text-sm leading-relaxed">
              Reliability needed a bit of attention too. The three formats
              generate in parallel, so one failed call to the model would reject
              the whole batch and the run came back empty. Wrapping each format
              in its own retry handled that cleanly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Toolset
            </h3>
            <ul className="max-w-prose space-y-2 text-sm leading-relaxed">
              {TOOLSET.map((tool) => (
                <li key={tool.name}>
                  <span className="font-semibold">{tool.name}</span>
                  <span className="text-muted">: {tool.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Time
            </h3>
            <div className="grid max-w-md grid-cols-3 gap-4">
              {TIME_BREAKDOWN.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="text-2xl font-bold text-accent">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="max-w-prose text-sm leading-relaxed text-muted">
              Hands-on is the planning, the guidelines, reviewing and directing.
              AI-driven is the code it actually wrote while I steered.
            </p>
          </div>
        </div>
      </Accordion>
    </section>
  );
}
