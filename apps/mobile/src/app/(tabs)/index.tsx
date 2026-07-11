import { FeatureCard } from '@/components/FeatureCard';
import { Screen } from '@/components/Screen';

export default function LoopScreen() {
  return (
    <Screen title="Your Loop" subtitle="Food moments from the people you trust, kept close and useful.">
      <FeatureCard
        badge="From Minh · 12 min ago"
        title="Bún bò Huế"
        body="Bếp Huế · 4 friends would order it again · Strong flavor, generous portion."
      />
      <FeatureCard
        badge="Private circles"
        title="No follower pressure"
        body="Share each check-in with friends, family, coworkers, or only yourself."
      />
    </Screen>
  );
}

