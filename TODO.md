# MaizeConnect Mobile-First Responsive Design TODO

## Current Issues Identified

- **Text sizes**: `text-8xl`, `text-[110px]`, `text-7xl` are massive on mobile
- **Padding**: `px-8`, `py-48`, `py-32` cause overflow and excessive whitespace
- **Gaps**: `gap-32`, `gap-24` break mobile layouts
- **Buttons/Inputs**: `h-20` is too tall for mobile touch targets
- **Border radius**: `rounded-[4rem]` looks cartoonish on small screens
- **Cards**: `p-12`, `p-10` padding squeezes content on mobile
- **Navigation**: No mobile menu/hamburger
- **Device mockup**: Fixed `w-[320px] h-[640px]` doesn't scale
- **Grids**: Missing responsive breakpoints (`md:`, `lg:`)

## Implementation Plan

### Phase 1: Global Styles (index.css)

- [ ] Add responsive scrollbar-hide utility
- [ ] Ensure base font sizes scale properly

### Phase 2: LandingPage.tsx

- [ ] Navigation: mobile hamburger menu
- [ ] Hero: responsive text, padding, gaps
- [ ] How it works: responsive grid
- [ ] USSD section: scaling device mockup
- [ ] Territory: responsive layout
- [ ] Impact stats: responsive grid
- [ ] Footer: stack on mobile

### Phase 3: AboutPage.tsx

- [ ] Hero: responsive text
- [ ] Vision section: responsive grid
- [ ] Pillars: responsive grid
- [ ] Tech section: responsive layout
- [ ] Ecosystem: responsive grid
- [ ] CTA: responsive layout
- [ ] Footer: stack on mobile

### Phase 4: Auth Pages (Login/Register)

- [ ] Form pane: reduce padding on mobile
- [ ] Inputs: reduce height on mobile
- [ ] Visual pane: maintain hidden on mobile

### Phase 5: Dashboard Pages

- [ ] DashboardHome: tighten cards on mobile
- [ ] Blueprints: responsive grid
- [ ] Compose: responsive form layout
- [ ] Inbox: responsive message cards
- [ ] Settings: responsive tabs and cards

### Phase 6: Commit & Push

- [ ] Commit all changes
- [ ] Push to PR #1
