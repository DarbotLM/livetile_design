# First Agent Platform Bakeoff

## Summary

The first agent platform bakeoff was a parallel design-and-build exercise for comparing how multiple agent platforms respond to a shared product brief, a shared visual language, and the same orchestration pressure. Rather than running each platform in isolation, the bakeoff used a common design target and let the platforms iterate side by side while a human orchestrator observed, compiled, built, and redirected the work.

The result was not only a set of visual artifacts. It was also a working pattern for evaluating agentic development: shared constraints, parallel execution, continuous synthesis, and evidence captured as reviewable assets.

## Goals

The bakeoff was designed to answer practical engineering questions:

1. Can different agent platforms converge on a coherent design when they start from the same brief?
2. Which platforms move fastest from design intent to buildable output?
3. Which platforms produce artifacts that are easiest to inspect, compare, and improve?
4. How much orchestration is required to keep parallel agents aligned?
5. What evidence should be captured so the final comparison is auditable instead of anecdotal?

## Operating model

The bakeoff used a hub-and-spoke workflow. The orchestrator supplied the shared design brief, observed each platform's output, compiled the useful deltas, built and reviewed the resulting artifacts, then fed findings back into the next iteration.

| Role | Responsibility |
| --- | --- |
| Orchestrator | Defined the shared target, sequenced iterations, compared outputs, and selected improvements. |
| Agent platforms | Produced design variants, implementation changes, and review artifacts from the same constraints. |
| Shared design system | Provided the common language for layout, tile size, visual hierarchy, and interaction states. |
| Build pipeline | Converted selected outputs into reviewable local HTML and Vite build artifacts. |
| Evidence set | Preserved screenshots, generated pages, and source changes for later inspection. |

## Shared design brief

Each platform worked from the same design premise: an adaptive LiveTile dashboard that could present dense model, agent, evaluation, and telemetry information without losing visual hierarchy. The shared target emphasized:

- A tile-based layout with predictable sizing and spacing.
- Clear information hierarchy across overview, detail, status, and comparison views.
- Reusable schema definitions so tile content could be inspected independently from rendering.
- Responsive review surfaces for full-screen, breakpoint, and collapsed states.
- A build path that produced self-contained artifacts suitable for GitHub review.

## Parallel iteration pattern

The bakeoff followed a repeated loop:

1. The orchestrator provided or refined the shared design target.
2. Each platform generated a candidate approach against the same constraints.
3. Outputs were collected into comparable review artifacts.
4. Strong ideas were compiled into the working branch.
5. The branch was built and visually reviewed.
6. Follow-up prompts redirected the next pass toward gaps, polish, or consistency issues.

This loop kept the platforms in constructive competition. No single platform owned the full direction; instead, the orchestrator used the best contribution from each pass to improve the shared design.

## What was built

The repository now reflects the bakeoff in several concrete surfaces:

| Surface | Purpose |
| --- | --- |
| `src\canvas\` | Interactive React canvas for reviewing tile composition and settings. |
| `src\shared\schema-index.ts` | Typed catalog that describes tile categories, fields, and content expectations. |
| `src\tiles\` | Renderers and tile implementations used by the canvas and generated layouts. |
| `docs\LIVETILE-CATALOG.md` | Human-readable tile catalog for GitHub review. |
| `docs\BD-COORDINATE-SYSTEM.md` | Coordinate-system reference for consistent layout reasoning. |
| `docs\BRIDGE-API.md` | Optional local bridge contract for telemetry and agent state. |
| `lib\img\` | Captured bakeoff screenshots and visual review evidence. |
| `breakpoint-tester.html` | Local breakpoint review page for validating responsive behavior. |
| `tile-spec-viewer.html` | Local review page for inspecting tile specification output. |

## Evaluation dimensions

The bakeoff used a practical engineering rubric rather than a purely subjective design review.

| Dimension | What was evaluated |
| --- | --- |
| Design fidelity | Whether the output matched the shared visual language and layout constraints. |
| Implementation readiness | Whether the output could be converted into maintainable source changes. |
| Iteration quality | Whether follow-up prompts produced meaningful improvements instead of superficial churn. |
| Inspectability | Whether artifacts could be reviewed in GitHub, local HTML, or screenshots without special tooling. |
| Build compatibility | Whether selected changes survived the TypeScript and Vite build path. |
| Evidence quality | Whether the comparison left behind artifacts that explain the decision trail. |

## Orchestrator observations

The orchestrator role was active, not passive. The strongest results came from continuously shaping the parallel work:

- Shared constraints prevented platforms from optimizing for unrelated targets.
- Side-by-side iteration exposed strengths and weaknesses faster than serial evaluation.
- Buildable artifacts mattered more than polished narrative alone.
- Screenshots were useful evidence, but source-backed review pages made iteration more repeatable.
- The most useful platform outputs were the ones that could be compiled into the shared system without large rewrites.

## Engineering lessons

### Shared designs improve comparison quality

When each platform uses the same design system, differences in output become easier to attribute to reasoning, implementation quality, and iteration behavior. Without shared constraints, the bakeoff would compare unrelated interpretations rather than platform capability.

### Parallel iteration needs a synthesis layer

Parallel agents generate many plausible directions. The orchestrator's synthesis layer is what turns those directions into a coherent product. In this bakeoff, synthesis meant selecting the strongest visual decisions, preserving useful artifacts, and rejecting outputs that did not improve the shared system.

### Build artifacts should not be the source of truth

The Vite build can produce a self-contained `dist\index.html`, but source files and docs should remain the reviewable source of truth. Generated output can always be rebuilt from `src\`, `docs\`, and configuration.

### Evidence belongs near the system

Keeping review images in `lib\img\` and documentation in `docs\` makes the bakeoff easier to audit from GitHub. The evidence is close enough to the implementation to explain why the source evolved.

## Repository hygiene decisions

The check-in preparation added standard project hygiene around the bakeoff output:

- Root `README.md` for GitHub landing-page context.
- Root `LICENSE` using the MIT License.
- Root `.gitignore` to keep dependencies, generated builds, TypeScript incremental metadata, logs, editor settings, and local environment files out of future commits.
- Package metadata updated to declare the MIT license.
- Generated build output treated as reproducible output rather than committed source.

## Reproducing the review flow

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Open the local review pages directly when comparing static artifacts:

```text
breakpoint-tester.html
tile-spec-viewer.html
viewport-grid.html
```

## Recommended next bakeoff improvements

Future bakeoffs should make the comparison even more measurable:

1. Define a small scoring rubric before generation starts.
2. Capture prompt, platform, artifact path, and reviewer notes for every round.
3. Add a repeatable screenshot capture script for key viewport sizes.
4. Separate generated candidate artifacts from curated source artifacts.
5. Record which platform contributions were accepted, rejected, or merged into a hybrid output.

## Conclusion

The first agent platform bakeoff demonstrated that parallel agent iteration is most valuable when it is constrained by a shared design system and guided by an active synthesis loop. The orchestrator's role was to keep the work comparable, compile the best contributions, build the selected direction, and preserve enough evidence for the result to be reviewed later in GitHub.
