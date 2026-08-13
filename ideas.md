# Stock Engine Guide — Design Direction

## Three Initial Directions

### Theme Name: Editorial Signal Atlas
Very Brief Intro: A dark editorial atlas that turns each mode into a clearly numbered field guide. It balances analytical precision with the tactile warmth of Japanese print design.
Probability: 0.07

### Theme Name: Quiet Research Desk
Very Brief Intro: A light, paper-first documentation experience that feels like a calm research notebook with restrained financial data marks.
Probability: 0.03

### Theme Name: Control Room Blueprints
Very Brief Intro: A structured operational manual with blueprint lines, status chips, and a more utilitarian product-engineering tone.
Probability: 0.09

## Selected Approach: Editorial Signal Atlas

### Design Movement
Contemporary Swiss editorial design interpreted through Japanese information design and financial research publishing.

### Core Principles
1. Every mode is a distinct chapter with a strong index number, a concise promise, and a clear “how to use it” path.
2. Dark ink surfaces provide focus while warm paper panels make dense explanations readable.
3. Visual hierarchy comes from scale, rhythm, and thin rules rather than decorative cards everywhere.
4. Product claims stay grounded in the uploaded source materials; the site distinguishes documented behavior from interpretation.

### Color Philosophy
Ink navy (#101923) is the analytical base: calm, serious, and legible for long reading. Warm ivory (#F4EFE5) creates the feeling of a printed field guide. Cobalt (#2F6BFF) marks active signals and navigation. Vermilion (#E4583E) is reserved for risk, alerts, and moments that need attention. The palette is intentionally limited so that the meaning of color remains stable across all pages.

### Layout Paradigm
A persistent left rail acts as the atlas index on desktop and becomes a compact top index on mobile. The main reading canvas is asymmetrical: a narrow metadata column anchors each chapter while the explanatory content occupies a wider paper plane. Mode pages use a repeatable editorial sequence—orientation, workflow, outputs, safeguards, and practical checklist—so readers can scan without losing depth.

### Signature Elements
1. Oversized chapter numerals with a thin cobalt route line.
2. Small “signal labels” that classify each section as INPUT, ENGINE, OUTPUT, or SAFETY.
3. A faint coordinate-grid texture and red annotation marks used sparingly as editorial punctuation.

### Interaction Philosophy
Navigation should feel like turning to a chapter, not opening an app drawer. Hovering a mode reveals its short promise and route number. Active links gain a cobalt bar and a quiet shift in contrast. No interaction hides essential text; progressive disclosure is used only for secondary implementation notes.

### Animation
Use short 180–240ms ease-out transitions for rail links, buttons, and mode cards. Chapter headers should enter with a small vertical lift and opacity change; diagrams and metadata can stagger by 40ms. Avoid continuous motion. Respect prefers-reduced-motion by removing entrance transforms and keeping only color/opacity changes.

### Typography System
Use Fraunces or Newsreader for display headings, paired with IBM Plex Sans for interface labels and body text. Headings use tight tracking and a slightly condensed rhythm; body copy stays at 1.72 line-height for Japanese readability. Metadata is uppercase Latin or compact Japanese labels at 11–12px with wide tracking.

### Brand Essence
Stock Engine Guide is a field guide for understanding a macro-aware stock analysis engine, built for investors and maintainers who need to know what each mode does before they use it. Personality: precise, calm, candid.

### Brand Voice
Headlines are direct and specific. CTAs explain the next action rather than selling. Microcopy warns about boundaries without alarmism.

Example lines:
- 「市場を読む前に、エンジンの判断経路を読む。」
- 「CSVを入れる。マクロとの距離を測る。」

### Wordmark & Logo
Use a compact signal-engine mark: a rising arrow passing through a small gear ring, paired with the wordmark in a high-contrast editorial serif. The symbol works alone in the rail and favicon.

### Signature Brand Color
Signal Cobalt — #2F6BFF. It is reserved for active routes, primary links, and confirmed analytical signals.

## Content Architecture Notes

The source materials describe a service made from several operational modes. The guide will make the following six chapter pages explicit:

| Chapter | Page slug | Source-grounded scope |
|---|---|---|
| 01 | `/modes/market-screener` | Market selection, macro indicators, ticker screening, BUY/WATCH/AVOID rationale, detail breakdown, auto screener |
| 02 | `/modes/portfolio-analyzer` | Broker CSV upload, weighted macro score, headwind detection, rebalancing suggestions, local-session privacy |
| 03 | `/modes/paper-trading` | Five virtual accounts, BUY/SELL simulation, live price fallback, P&L and macro score, JSON save/load |
| 04 | `/modes/verification-board` | Historical prediction validation, latest price refresh, hit/miss, accuracy and return metrics |
| 05 | `/modes/macro-timeline` | G20 macro indicators, event chronology, macro shock context, research trail |
| 06 | `/modes/alerts` | Active monitoring, email/Telegram channels, severity, event filters, digest frequency, dispatch logs |

The landing page will explain how the six modes form one service and will link to each chapter. The site will not claim undocumented cloud behavior where the source guide describes browser-local processing; any such distinction will be called out in the relevant page.
