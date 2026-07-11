# BiteLoop interactive prototype map

The prototype exists to expose product scope before backend implementation. A
screen marked interactive can be navigated and manipulated with local mock state;
it does not imply persistence or production readiness.

| Capability | Prototype entry | Interactive now | Implementation still required |
| --- | --- | --- | --- |
| Email, Apple, Google login | Profile → Sign out / Login | Form and provider buttons | Supabase Auth, OAuth credentials, Apple compliance, session storage |
| In-app camera | Capture → Open BiteLoop camera | Live preview, flash, lens presets, shutter | Upload compression, recovery, metadata removal policy |
| Photo library | Capture → Choose from library | Native library picker | Upload and draft persistence |
| Check-in draft | Photo ready → Arrow | Dish, price, audience controls | Draft repository, validation, offline retry |
| Exact restaurant branch | Check-in → Choose restaurant | Search/map/results layout | Goong adapter, PostGIS, permissions, pin corrections |
| Menu item | Check-in → What | Name, price, categories | Menu tables, contribution moderation, freshness |
| Structured review | Check-in → Review this dish | All core non-star metrics | Database schema, aggregation, edit history |
| Private circles | Profile or Check-in → Circles | Audience chips and invite UI | Membership, invitation, RLS policies, realtime |
| Loop | Loop tab | Feed cards and actions | Feed query, pagination, reactions, realtime |
| Journal and favorites | Loop → My bites → Profile | Destination rows and summaries | Queries, maps, filters, saved state |
| Taste profile | Profile → Taste profile | Navigation placeholder | Allergen model, hard/soft rules, onboarding |
| Settings and currency | Profile → Settings | Currency and notification controls | Persistence, exchange rates, permissions links |
| Individual Decide | Decide tab | Price-band selection | Eligibility query, ranking, explanation, actions |
| Group Decide | Decide → Decide with a group | Room and result states | Invitations, private constraints, intersection, voting |

## Camera zoom behavior

`expo-camera` embeds the camera preview and capture session inside BiteLoop. It
reports physical iOS lenses through `onAvailableLensesChanged` and accepts a
specific lens through `selectedLens`.

- **0.5×** selects the reported ultra-wide lens. The control is disabled when
  the device does not expose one.
- **1×** selects the wide-angle lens at zero digital zoom.
- **2×** prefers a reported telephoto lens; otherwise it applies moderate zoom
  to the wide lens.
- **4×** uses the selected telephoto/wide lens plus normalized camera zoom.

Expo exposes digital zoom as a normalized `0...1` percentage of the device's
maximum, not an absolute optical multiplier. As a result, exact 2×/4× field of
view varies by iPhone camera hardware. Production acceptance must test supported
iPhone models and show only factors that can be delivered honestly on each
device.

## Prototype completion rule

Before database work begins, every row above should have:

1. A reachable screen or intentionally documented placeholder.
2. Loading, empty, success, permission-denied, and error-state designs where
   applicable.
3. An identified Supabase table/policy, native capability, or external service.
4. An iOS acceptance test in the implementation checklist.

