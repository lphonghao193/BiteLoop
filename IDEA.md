# BiteLoop — Social Food Check-ins and Decision Assistant

## Product idea

BiteLoop is a mobile app for sharing food moments with close friends, remembering
what was worth ordering, and deciding what to eat or drink next.

It combines the private, camera-first experience of Locket with restaurant and
menu check-ins, structured reviews, food discovery, and a personalized
randomizer. Instead of building another public five-star restaurant directory,
BiteLoop focuses on individual dishes, useful context, and recommendations from
people the user trusts.

> See what your friends are eating, remember what you loved, and decide what to
> eat next.

## Problem

People commonly face three related problems:

1. Food recommendations shared in chats or stories are quickly lost.
2. A single five-star rating does not explain whether a particular dish is
   tasty, good value, filling, suitable for an occasion, or worth ordering
   again.
3. Choosing what to eat is difficult when several people have different
   budgets, dietary needs, dislikes, and travel limits.

BiteLoop turns everyday food photos into a private, searchable food journal and
uses the resulting preference data to make better individual and group choices.

## Target users

- Friends and couples who regularly share food recommendations.
- Students and coworkers choosing where to eat as a group.
- Food explorers who want a personal record of dishes and restaurants.
- People with dietary restrictions, allergies, or strong dislikes who need
  safer suggestions.
- Users who want trustworthy recommendations without public-review pressure.

## Product principles

- **Dish first:** A restaurant may have one excellent dish and several average
  ones, so dishes and drinks are reviewed independently from the venue.
- **Private by default:** Sharing centers on small circles rather than follower
  counts and public popularity.
- **Concrete over abstract:** Reviews ask specific questions instead of relying
  on a single five-star score.
- **Fast to contribute:** A basic check-in should take less than 30 seconds.
- **Useful later:** Every check-in should help the user remember, search, or
  decide something in the future.
- **Explain recommendations:** The app should say why an option was selected.

## Main navigation

The app uses three stable top-level tabs:

1. **Loop** — A visual feed of food and drink moments from trusted circles.
2. **Capture** — The default home screen and camera-first check-in flow.
3. **Decide** — The filtered Pick for Me food and drink assistant.

Capture opens first because recording a meal is the app's most frequent and
time-sensitive action. The camera is still launched only after an explicit tap,
so the app does not surprise users with a permission prompt on startup.

Explore is integrated into Loop and Decide through search and nearby results.
Journal, saved dishes, Taste Profile, settings, and currency are secondary
destinations reached from the profile or My bites controls rather than permanent
tabs.

## Core features

### 1. Private circles and Locket-like sharing

Users create small circles for friends, family, partners, or coworkers. A
check-in can be shared with one or more circles or kept private.

The latest check-in can appear in a home-screen widget. Tapping the widget opens
the dish, restaurant, review summary, and directions. Friends can respond with
quick reactions such as “Want this,” “Been here,” or an emoji without turning
the experience into a public social network.

### 2. Food and drink check-ins

A check-in can contain:

- One or more photos.
- A short caption.
- Restaurant name and map location.
- Menu item name, price, and portion information.
- Visit time and dining mode: dine-in, takeaway, or delivery.
- Food and drink categories.
- A structured review of each selected item.
- Optional private notes, such as parking advice or a preferred custom order.
- Visibility: private, selected circles, or public if public discovery is later
  supported.

The expected flow is:

1. Take a photo in BiteLoop's embedded camera or choose one from the library.
2. Select a nearby restaurant or add a missing location.
3. Select items from the menu or create a missing item.
4. Add categories and complete a quick review.
5. Choose the audience and publish.

The embedded camera keeps users inside the check-in flow. On iOS it exposes
available physical lenses and presents 0.5×, 1×, 2×, and 4× choices where the
device can support them. Unsupported lens factors are disabled instead of
pretending that digital cropping is an optical lens. Flash, shutter, retake, and
photo-library access remain reachable with minimal controls over the preview.

### 3. Restaurant locations and community menus

Every restaurant is attached to a geographic location and may contain multiple
branches. Branches are kept separate because prices, menus, wait times, and
quality can differ.

The app uses a Vietnam-friendly map and place-search provider to locate a
restaurant branch. **Goong** is the preferred MVP provider because it supplies
Vietnam-focused autocomplete, place details, and geocoding with a free usage
allowance. Google Maps may be supported later as an optional provider rather
than a requirement.

When a user selects a search result, BiteLoop stores:

- The provider name and provider place ID.
- Exact latitude and longitude returned by the provider.
- Display name and formatted address.
- Branch-specific phone number or metadata when available.
- The time at which the location data was confirmed.

Provider IDs are never used as BiteLoop's primary database ID. BiteLoop assigns
its own branch ID so a restaurant can be retained or matched if map providers
change. Users can correct a misplaced pin before check-in, and the corrected
coordinate is recorded as community-provided rather than silently overwriting
provider data.

Menus may include item names, descriptions, photos, prices, availability,
dietary labels, portion notes, and last-confirmed dates. Users can propose
missing items or corrections. Frequently disputed changes should require
confirmation from additional users or a moderator.

Old prices and availability must be visibly dated so the app does not present
community data as guaranteed current information.

### 4. Multi-metric reviews

BiteLoop does not require an overall five-star rating. It collects concrete
signals that are easier to interpret:

#### Dish or drink metrics

- **Order again:** Yes, Maybe, or No.
- **Taste:** Disappointing, Fine, or Memorable.
- **Value:** Poor, Fair, or Great.
- **Portion:** Too small, Just right, or Too large.
- **Expectation:** Worse than expected, As expected, or Better than expected.
- **Flavor intensity:** Optional scales for spicy, sweet, sour, salty, bitter,
  and rich.
- **Texture and temperature:** Descriptive tags such as crispy, creamy, chewy,
  soupy, hot, cold, or iced.
- **Free-text note:** Optional and short.

#### Restaurant visit metrics

- Actual or estimated wait time.
- Service: Smooth, Minor issues, or Frustrating.
- Noise level: Quiet, Moderate, or Loud.
- Atmosphere and occasion tags, such as date-friendly, family-friendly,
  work-friendly, quick lunch, or late night.
- Accessibility, parking, seating, and dietary-confidence notes where relevant.

The app summarizes responses in plain language rather than hiding them behind an
average. For example:

> 82% would order this again. Usually described as strongly flavored and
> generous, although many reviewers consider it expensive.

Reviews from friends and users with similar preferences may be shown separately
from the broader community summary.

### 5. Food and drink taxonomy

Items can have multiple categories so they are not forced into one rigid type:

- **Cuisine:** Vietnamese, Korean, Italian, Thai, and others.
- **Dish type:** Noodles, rice, pizza, barbecue, soup, dessert, or snack.
- **Drink type:** Coffee, tea, juice, smoothie, cocktail, beer, or wine.
- **Main ingredients:** Beef, chicken, seafood, tofu, egg, or vegetables.
- **Flavor:** Spicy, sweet, sour, savory, bitter, smoky, or rich.
- **Texture:** Crispy, creamy, chewy, crunchy, tender, or soupy.
- **Temperature:** Hot, warm, cold, frozen, or iced.
- **Occasion:** Breakfast, quick lunch, date, group meal, celebration, or late
  night.
- **Dietary attributes:** Vegetarian, vegan, halal, gluten-free, dairy-free, or
  low-carb.

An item may have several tags—for example, an iced latte can be categorized as
coffee, cold, creamy, sweet, and afternoon drink.

Dietary labels should distinguish between restaurant-provided claims,
community-reported information, and verified information. The app must warn
users that filters cannot guarantee the absence of allergens or cross-contact.

### 6. “Pick for Me” randomizer

The randomizer acts as a decision assistant, not an unrestricted roulette wheel.
It first creates a set of eligible items, ranks them by relevance, and then adds
controlled randomness so the same popular options do not always win.

Users can filter by:

- Current location and maximum travel distance.
- Food, drink, or either.
- Budget per person using quick-select price ranges rather than requiring a
  manually typed amount.
- Open now or desired meal time.
- Dine-in, takeaway, or delivery.
- Group size.
- Cuisine, dish type, ingredients, flavor, or occasion.
- Dietary requirements.
- Familiar choices versus “surprise me.”

Users can exclude:

- Allergens and permanent dislikes.
- Specific ingredients, dishes, cuisines, or restaurants.
- Items eaten recently.
- Restaurants visited within a chosen period.
- Options outside the budget or travel limit.
- Suggestions dismissed with “Never suggest this.”

The result should include an explanation, such as:

> Today's pick: Bun bo Hue at Bep Hue — 8 minutes away, within your budget,
> open now, and four friends said they would order it again.

Available actions are **Let's go**, **Not today**, **Never suggest this**,
**Spin again**, and **Choose between three**. “Not today” is temporary;
“Never suggest this” updates the user's persistent exclusions.

### 7. Price ranges and currency

Vietnamese dong (**VND**) is the default currency. Wherever a user selects a
budget, the app presents large, tap-friendly price ranges so the choice can be
made quickly. The default per-person ranges are:

- Under 100,000 VND.
- 100,000–200,000 VND.
- 200,000–300,000 VND.
- 300,000–500,000 VND.
- Over 500,000 VND.

Users may select one range or multiple adjacent ranges. For example, selecting
both 100,000–200,000 VND and 200,000–300,000 VND means the acceptable budget is
100,000–300,000 VND per person. An “Any price” option clears the budget filter.

The user can change their preferred currency in Settings. Currency selectors
should show the currency code and symbol where helpful—for example, VND (₫),
USD ($), or EUR (€)—to avoid ambiguity. After a currency is changed:

- Prices throughout the app are displayed in the selected currency.
- Budget choices use rounded, locally understandable ranges rather than awkward
  direct conversions of the VND boundaries.
- A restaurant's original menu price and currency remain stored unchanged.
- Converted values are estimates and show when their exchange rate was last
  updated.

The app may suggest a currency from the user's locale, but it must not silently
replace the user's saved preference. Exact prices can still be entered when
adding a menu item; quick ranges are used for filtering and decision-making.

### 8. Group decision mode

One user creates a temporary decision room and invites others. Each participant
submits their budget, distance, dietary requirements, and exclusions privately.
The app removes options that violate any hard constraint, then randomizes among
the remaining choices.

If no option satisfies everyone, the app explains which constraints conflict
and asks participants which flexible preference they want to relax. Allergies
and requirements explicitly marked as hard constraints are never relaxed
automatically.

### 9. Personal journal and discovery

The Journal provides:

- A chronological history of food and drink check-ins.
- A map of visited restaurants.
- Saved dishes and “order again” items.
- Search by place, cuisine, ingredient, tag, date, or companion.
- A Taste Passport showing explored cuisines and dish types.
- Private notes and reminders.
- Revisit suggestions for places the user liked.

Explore prioritizes nearby items recommended by friends, followed by items that
match the user's taste profile. Users should be able to understand whether a
recommendation comes from friends, similar tastes, proximity, popularity, or a
paid placement. Sponsored results must be clearly labeled and should not enter
the randomizer unless the user opts in.

## Use cases

### UC-01: Share a meal with close friends

**Actor:** Signed-in user  
**Goal:** Record a meal and share it with a private circle.  
**Preconditions:** The user belongs to at least one circle.

**Main flow:**

1. The user opens Check In and takes a food photo.
2. The app suggests nearby restaurants using the user's location.
3. The user selects the restaurant and the relevant menu item.
4. The user adds a quick review and optional caption.
5. The user selects one or more circles and publishes.
6. Circle members see the photo in their Loop; the latest item may also appear
   in their widget.

**Alternative flows:** The user adds a missing restaurant or menu item, skips
the review, or saves the check-in privately.  
**Success result:** The meal is stored in the user's Journal and is visible only
to the selected audience.

### UC-02: Check in several menu items at one restaurant

**Actor:** Signed-in user  
**Goal:** Record a shared meal containing multiple dishes or drinks.

**Main flow:**

1. The user selects the restaurant and visit details once.
2. The user adds multiple menu items and photos.
3. The user reviews each item independently.
4. The user publishes one visit containing all items.

**Success result:** The restaurant visit is recorded once, while each dish has
its own categories and review signals.

### UC-02A: Find the exact restaurant branch

**Actor:** Signed-in user  
**Goal:** Attach the correct physical restaurant branch to a check-in.

**Main flow:**

1. The app requests location permission only when nearby search is needed.
2. The user types the restaurant name or address.
3. The app sends the query and approximate search area to the configured place
   provider, such as Goong.
4. The app shows matching branches with names, addresses, distances, and map
   pins.
5. The user selects a branch and confirms its pin on the map.
6. The app stores BiteLoop's branch ID together with the provider ID, latitude,
   longitude, address, and confirmation time.

**Alternative flows:** The user searches without sharing device location,
creates a missing branch manually, or corrects a misplaced pin.  
**Success result:** The check-in is attached to a branch-specific coordinate
that can be used for distance filtering and navigation.

### UC-03: Decide what to eat nearby

**Actor:** Signed-in user  
**Goal:** Receive one suitable suggestion without browsing a long list.

**Main flow:**

1. The user opens Pick for Me.
2. The user taps one or more budget ranges, such as 100,000–200,000 VND, chooses
   a travel distance, and selects “food.”
3. The app applies permanent dislikes, allergens, recent-meal exclusions, and
   restaurant availability.
4. The app selects an eligible option and explains the choice.
5. The user taps Let's go to open navigation or restaurant details.

**Alternative flows:** The user requests three choices, temporarily rejects the
result, spins again, or permanently excludes it.  
**Success result:** The user receives an actionable recommendation that meets
all hard filters.

### UC-04: Decide on a drink

**Actor:** Signed-in user  
**Goal:** Find a suitable drink independently of a meal.

**Main flow:**

1. The user selects “drink” in Pick for Me.
2. The user optionally chooses categories such as coffee, tea, alcoholic, cold,
   or low-sugar, then taps a price range.
3. The app applies location, budget, availability, and dislike filters.
4. The app recommends a drink and where to obtain it.

**Success result:** Food-only results are excluded and the suggestion matches
the selected drink context.

### UC-05: Make a group food decision

**Actors:** Room creator and invited participants  
**Goal:** Find an option acceptable to the whole group.

**Main flow:**

1. The creator starts a decision room and shares an invitation.
2. Participants submit constraints and preferences, including one or more
   quick-select price ranges in their preferred display currency.
3. The app intersects all hard constraints.
4. The app randomizes among eligible options and presents one result.
5. Participants accept it or vote to reroll.

**Exception flow:** If no eligible option exists, the app identifies conflicting
flexible constraints without exposing private dietary details unnecessarily.
Participants choose whether to expand distance, increase budget, or remove a
soft preference.  
**Success result:** The group receives an option that violates no hard
constraint.

### UC-06: Review a dish without using stars

**Actor:** User who checked in or ordered the dish  
**Goal:** Leave an informative review quickly.

**Main flow:**

1. The app asks whether the user would order the dish again.
2. The user selects taste, value, portion, and expectation responses.
3. The user optionally adds flavor scales, tags, and a short note.
4. The app saves the review and updates the dish summary.

**Success result:** Other users can see why the dish is or is not recommended,
without relying on an unexplained average rating.

### UC-07: Find a friend's recommendation later

**Actor:** Signed-in user  
**Goal:** Recover a food recommendation previously seen in the Loop.

**Main flow:**

1. The user opens Explore or searches the Loop history.
2. The user filters by friend, location, cuisine, or “Want this” reactions.
3. The app returns matching check-ins.
4. The user opens a result to see the dish, restaurant, menu information, and
   directions.

**Success result:** A fleeting social recommendation becomes searchable and
actionable.

### UC-08: Maintain personal dislikes and dietary requirements

**Actor:** Signed-in user  
**Goal:** Prevent unsuitable items from appearing in recommendations.

**Main flow:**

1. The user opens Taste Profile.
2. The user adds allergens, dietary requirements, disliked ingredients, and
   disliked cuisines.
3. The user marks each rule as a hard exclusion or soft preference.
4. The app applies the rules to Explore and Pick for Me.

**Success result:** Hard exclusions do not appear in generated suggestions, and
soft preferences affect ranking without removing all variety.

### UC-09: Add or correct a menu item

**Actor:** Signed-in contributor  
**Goal:** Improve incomplete or outdated menu information.

**Main flow:**

1. The user opens a restaurant menu.
2. The user adds a new item or proposes a correction.
3. The user provides a menu photo or visit date when available.
4. The app records the source and marks the information's confirmation status.
5. Other users or moderators confirm or dispute the change.

**Success result:** Menu data is updated with visible provenance and freshness.

### UC-10: React to a widget check-in

**Actor:** Circle member  
**Goal:** Respond to a friend's latest food moment with minimal effort.

**Main flow:**

1. The member sees the check-in photo in the home-screen widget.
2. The member taps it to open the check-in.
3. The member reacts or marks the dish as “Want this.”
4. The app notifies the author according to notification preferences.

**Success result:** Friends interact around a food moment without needing a
public post or lengthy conversation.

### UC-11: Revisit a previously liked dish

**Actor:** Signed-in user  
**Goal:** Find something the user already knows they enjoyed.

**Main flow:**

1. The user opens Journal and selects “Would order again.”
2. The app shows matching dishes and their locations.
3. The user filters for nearby restaurants that are currently open.
4. The user selects a dish and opens directions or ordering information.

**Success result:** The user's past experience becomes a practical future
recommendation.

### UC-12: Change the preferred currency

**Actor:** Signed-in user  
**Goal:** View prices and choose budgets in a familiar currency.

**Main flow:**

1. The user opens Settings and selects Currency.
2. The user chooses a currency such as VND, USD, or EUR.
3. The app saves the preference and refreshes displayed prices.
4. Pick for Me shows rounded quick-select ranges appropriate for the selected
   currency.
5. Converted menu prices are marked as estimates while the original prices
   remain available.

**Success result:** The selected currency is used consistently across menus,
check-ins, filters, and group decisions without changing original restaurant
price data.

## Important product rules

- A user controls the audience for every check-in.
- Exact live location is never shared automatically; the attached restaurant
  location is shared only with the selected audience.
- Device location is used to bias nearby search only after permission is
  granted. A restaurant's public branch coordinate is stored separately from
  the user's device location.
- Map-provider IDs are external references; BiteLoop owns a stable internal
  restaurant-branch ID and can switch providers without losing check-ins.
- Reviews belong to a specific dish and restaurant branch where possible.
- Hard dietary exclusions override ranking, popularity, sponsorship, and
  randomness.
- The app explains why a recommendation was included and allows the user to
  correct the preference that caused it.
- Menu prices, opening hours, and dietary labels display their source and
  freshness when known.
- Budget filters use quick-select ranges; VND is the default currency, and the
  user's explicit currency preference is preserved.
- Deleting a check-in removes it from the user's Journal, shared feeds, and
  widget history, subject to clearly stated data-retention requirements.

## MVP scope

The first release should include:

1. Account creation and private circles.
2. Photo check-ins with restaurant locations.
3. Basic restaurant and menu-item creation.
4. Dish categories and multi-metric reviews.
5. Loop feed, reactions, and a basic home-screen widget.
6. Personal Journal with search and saved items.
7. Pick for Me with location, quick-select budget ranges, category, dietary,
   and dislike filters.
8. Persistent “Not today” and “Never suggest this” behavior.
9. VND pricing by default with a user-selectable display currency.

Group decision rooms, community menu moderation, automatic image recognition,
advanced taste matching, and public discovery can follow after the core
check-in-to-recommendation loop is validated.

## MVP success indicators

- Percentage of new users who complete their first check-in.
- Median time required to create a basic check-in.
- Weekly check-ins per active user.
- Percentage of users who return to a saved or “order again” dish.
- Percentage of randomizer sessions ending in Let's go or a saved choice.
- Number of recommendations opened from a friend's check-in.
- Retention of users who join at least one active circle.
- Frequency of rejected suggestions and the exclusion reasons, used to improve
  recommendation quality.

## Future opportunities

- Automatic recognition of dishes and menu text from photos.
- Importing a restaurant's official menu with freshness checks.
- Shared food wishlists and trip-based food collections.
- Taste compatibility between friends.
- Weather- and time-aware recommendations.
- Food exploration challenges and a visual Taste Passport.
- Optional reservation, navigation, delivery, or payment integrations.
- Creator or restaurant profiles, provided they do not weaken the private,
  trusted nature of the core experience.
