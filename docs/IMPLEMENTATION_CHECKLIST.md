# BiteLoop implementation checklist

The project is split into two phases:

1. **Development** — build and validate the complete MVP on iOS first.
2. **Deployment** — prepare environments, distribute the iOS app, release it,
   and only then adapt and release Android.

Work from top to bottom. A checked item means it has been verified, not merely
configured.

# Phase 1 — Development

## 0. Development foundation

### Repository and application

- [x] Initialize the Git repository with `main` as the default branch.
- [x] Scaffold the Expo React Native application.
- [x] Configure TypeScript.
- [x] Verify typechecking before removing host `node_modules`.
- [x] Initialize local Supabase configuration.
- [x] Add the product, stack, Docker, and architecture documentation.
- [x] Create this implementation checklist.

### Containerized development environment

- [x] Install Docker Desktop.
- [x] Add the Node.js 22 and Metro Dockerfile.
- [x] Add Docker Compose configuration and environment template.
- [x] Use `npm ci` with the committed `package-lock.json` inside Docker.
- [x] Remove host `node_modules`; Node, npm, Expo CLI, and Metro are
  containerized.
- [x] Add a containerized typecheck command.
- [x] Start Docker Desktop and verify its engine is healthy.
- [x] Build the `mobile` image successfully.
- [x] Run typechecking inside the mobile container.
- [x] Start Metro inside the mobile container and confirm its QR code is shown.

### Local backend

- [x] Generate `supabase/config.toml`.
- [x] Install the native Supabase CLI so host Node.js is unnecessary.
- [x] Start the local Supabase Docker stack.
- [x] Verify Supabase reports healthy services.
- [x] Open Supabase Studio at `http://127.0.0.1:54323`.
- [x] Put the local publishable key and device-reachable API URL in
  `.env.docker`.
- [x] Verify no secret or service-role key is exposed to the mobile application.

### iOS-first development target

- [x] Use a physical iPhone with Expo Go as the first iOS test target.
- [x] Align the project with Expo SDK 54 for Expo Go 54 compatibility.
- [x] Connect the iOS test target to containerized Metro.
- [x] Open the starter app successfully on iOS.
- [ ] Verify Loop, Capture, and Decide render on iOS, with Capture opening first.
- [ ] Take a photo and choose a library photo from the Capture home screen.
- [x] Verify the VND price-band controls work on iOS.
- [x] Record iOS 17.0 as the minimum supported product and deployment version.

### Foundation exit criteria

- [x] A clean checkout can build the mobile container without host Node.js.
- [x] Containerized typechecking passes.
- [x] Local Supabase is healthy and reachable from the iOS test target.
- [ ] The redesigned camera-first app runs on iOS without runtime errors.

Do not begin authentication until all Section 0 exit criteria pass.

## 0A. Interactive product prototype

- [x] Reduce navigation to Loop, Capture, and Decide.
- [x] Make Capture the default home destination.
- [x] Add embedded in-app camera UI with flash, shutter, and physical-lens-aware
  0.5×, 1×, 2×, and 4× controls.
- [x] Prototype login with email, Apple, and Google choices.
- [x] Prototype profile, Journal, favorites, map, and Taste Passport entry points.
- [x] Prototype settings, currency, privacy, and notifications.
- [x] Prototype restaurant branch search and map results.
- [x] Prototype menu item, exact price, categories, and audience selection.
- [x] Prototype the full structured review form.
- [x] Prototype private circles and invitation UI.
- [x] Prototype individual and group food decisions.
- [ ] Validate every prototype route on a physical iPhone.
- [ ] Add loading, empty, permission-denied, and error states to every data flow.
- [ ] Review and approve the scope matrix in `docs/PROTOTYPE.md`.

## 1. Authentication and profiles

- [ ] Install the Supabase JavaScript client and secure-storage dependency.
- [ ] Add the Supabase client repository adapter.
- [ ] Create the `profiles` database table and Row Level Security policies.
- [ ] Implement email sign-up.
- [ ] Implement email login and logout.
- [ ] Persist and restore the authenticated session.
- [ ] Add protected and public navigation routes.
- [ ] Allow the user to edit display name, avatar, and preferred currency.
- [ ] Test all authentication flows on iOS.

### Authentication exit criteria

- [ ] An iOS user can sign up, sign in, restart the app, and remain signed in.
- [ ] A user cannot read or update another user's private profile data.

## 2. Restaurants and exact branch locations

- [ ] Create restaurant and restaurant-branch database tables.
- [ ] Enable PostGIS and add a geographic index for branch coordinates.
- [ ] Implement the application-owned `LocationProvider` boundary.
- [ ] Implement the Goong autocomplete adapter.
- [ ] Implement Goong place-detail lookup for exact coordinates.
- [ ] Store provider ID, internal branch ID, address, latitude, and longitude.
- [ ] Allow users to create a missing branch.
- [ ] Allow users to correct a misplaced pin without overwriting source data.
- [ ] Display required map-provider attribution.
- [ ] Test iOS location permission: allow, deny, and restricted states.
- [ ] Test nearby branch search in at least two Vietnamese cities on iOS.

### Location exit criteria

- [ ] An iOS user can find and confirm the exact restaurant branch.
- [ ] Search still works by text when device-location permission is denied.

## 3. Basic private check-in

- [ ] Create menu-item, check-in, and check-in-item database tables.
- [ ] Add private photo storage with appropriate access policies.
- [ ] Select a food photo from the iOS photo library.
- [ ] Capture a food photo with the iOS camera.
- [ ] Select a restaurant branch.
- [ ] Select an existing menu item or create a missing item.
- [ ] Record exact menu price and currency.
- [ ] Save the check-in privately.
- [ ] Display the saved check-in in Journal.
- [ ] Support retrying an interrupted upload.

### Check-in exit criteria

- [ ] A complete private check-in can be created and reopened on iOS.
- [ ] Another user cannot access its photo or database record.

## 4. Structured reviews

- [ ] Create dish-review and restaurant-visit-review tables.
- [ ] Add Would order again: Yes, Maybe, or No.
- [ ] Add Taste: Disappointing, Fine, or Memorable.
- [ ] Add Value: Poor, Fair, or Great.
- [ ] Add Portion: Too small, Just right, or Too large.
- [ ] Add Expectation: Worse, As expected, or Better.
- [ ] Add optional flavor, texture, occasion, and short-note fields.
- [ ] Generate a plain-language aggregate instead of a star average.
- [ ] Verify that dish reviews and restaurant-visit reviews remain separate.
- [ ] Test the complete review form on small and large iPhone screens.

## 5. Private circles and Loop

- [ ] Create circle, membership, visibility, and invitation tables.
- [ ] Enforce circle visibility with database policies.
- [ ] Create, rename, and delete a circle.
- [ ] Invite and remove a member.
- [ ] Share a check-in with selected circles.
- [ ] Build the chronological Loop feed.
- [ ] Add reactions and Want this.
- [ ] Add realtime updates for new check-ins and reactions.
- [ ] Verify that unauthorized users cannot query private content directly.
- [ ] Test the two-user sharing journey on iOS devices or simulators.

## 6. Pick for Me

- [ ] Persist VND as the default currency and save the user's preference.
- [ ] Implement selectable VND price bands.
- [ ] Support multiple adjacent price bands and Any price.
- [ ] Add maximum-distance and open-now filters.
- [ ] Add food/drink, cuisine, ingredient, and occasion filters.
- [ ] Persist allergens, hard exclusions, dislikes, and soft preferences.
- [ ] Exclude recently eaten dishes and recently visited restaurants.
- [ ] Implement deterministic filtering before random selection.
- [ ] Implement weighted random selection among eligible items.
- [ ] Explain why each result was selected.
- [ ] Implement Let's go, Not today, Never suggest, and Spin again.
- [ ] Test that hard exclusions can never be relaxed by randomness.
- [ ] Test the full decision journey on iOS.

## 7. Development quality gate

- [ ] Add unit tests for pricing, filtering, and randomization.
- [ ] Add component tests for authentication and check-in forms.
- [ ] Add iOS end-to-end tests for authentication, check-in, sharing, and Pick
  for Me.
- [ ] Test loading, empty, offline, permission-denied, and error states.
- [ ] Audit iOS accessibility, Dynamic Type, contrast, and VoiceOver labels.
- [ ] Audit permissions, privacy, and error messages.
- [ ] Test supported iPhone screen sizes.
- [ ] Resolve high and critical dependency vulnerabilities.
- [ ] Complete all Phase 1 exit criteria.

# Phase 2 — Deployment

## 8. Deployment environments

- [ ] Create separate development, preview, and production Supabase projects.
- [ ] Apply migrations consistently to each environment.
- [ ] Configure production Row Level Security and Storage policies.
- [ ] Configure production Goong keys, restrictions, quotas, and monitoring.
- [ ] Configure environment-specific EAS variables and secrets.
- [ ] Ensure only publishable values are compiled into the mobile app.
- [ ] Define backup, restore, and migration rollback procedures.

## 9. iOS identity and signing

- [ ] Choose the permanent app name and bundle identifier.
- [ ] Replace `com.example.biteloop` in Expo configuration.
- [ ] Create or confirm the Apple Developer account.
- [ ] Create the application in App Store Connect.
- [ ] Configure EAS project ownership and iOS credentials.
- [ ] Configure camera, photo-library, and location permission descriptions.
- [ ] Create production icons, splash assets, screenshots, and metadata.

## 10. iOS preview and closed testing

- [ ] Produce an internal iOS preview build with EAS.
- [ ] Install and smoke-test the preview build on a physical iPhone.
- [ ] Connect the preview build to preview Supabase—not local Supabase.
- [ ] Add crash reporting and privacy-conscious product analytics.
- [ ] Distribute a TestFlight build to internal testers.
- [ ] Conduct a closed test with real Vietnamese restaurants and menus.
- [ ] Record and prioritize tester feedback.
- [ ] Fix release-blocking crashes, privacy defects, and data-access defects.

## 11. iOS App Store release

- [ ] Publish a privacy policy and account-deletion instructions.
- [ ] Complete App Privacy disclosures.
- [ ] Complete age-rating and content-rights declarations.
- [ ] Verify map-data attribution and provider terms.
- [ ] Produce the production iOS build.
- [ ] Submit the build for App Review.
- [ ] Respond to review issues and resubmit if necessary.
- [ ] Release gradually and monitor crashes, authentication, uploads, and cost.
- [ ] Confirm the production rollback and incident-response process.

## 12. Android adaptation after iOS stabilization

- [ ] Define the supported Android API range.
- [ ] Test every iOS-validated flow on Android.
- [ ] Adapt permissions, back navigation, image handling, and map behavior.
- [ ] Add Android end-to-end tests.
- [ ] Choose the permanent Android application ID.
- [ ] Create the Google Play Console application.
- [ ] Produce and test an Android preview build.
- [ ] Complete a closed Google Play test.
- [ ] Prepare Android store assets and disclosures.
- [ ] Produce and submit the Android production build.

## Deferred until the core loop is validated

- [ ] Group decision rooms.
- [ ] Home-screen widgets.
- [ ] Push notification campaigns.
- [ ] Community menu moderation workflows.
- [ ] Automatic dish and menu recognition.
- [ ] Machine-learning recommendations.
- [ ] Public creator or restaurant profiles.
