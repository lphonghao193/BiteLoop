import { FeatureCard } from '@/components/FeatureCard';
import { Screen } from '@/components/Screen';

export default function ExploreScreen() {
  return (
    <Screen title="Explore" subtitle="Search nearby dishes, menus, and recommendations from your circles.">
      <FeatureCard title="Friends recommend" body="Prioritize dishes people you trust said they would order again." />
      <FeatureCard title="Dish-first discovery" body="Find the exact menu item worth trying—not only a restaurant score." />
    </Screen>
  );
}

