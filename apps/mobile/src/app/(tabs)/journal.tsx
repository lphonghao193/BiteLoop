import { FeatureCard } from '@/components/FeatureCard';
import { Screen } from '@/components/Screen';

export default function JournalScreen() {
  return (
    <Screen title="Journal" subtitle="Your searchable memory of dishes, drinks, places, and people.">
      <FeatureCard title="Would order again" body="Return to meals you already know were worth it." />
      <FeatureCard title="Food map" body="See where you have eaten and what you ordered at each branch." />
      <FeatureCard title="Taste passport" body="Track cuisines, flavors, and dish types you have explored." />
    </Screen>
  );
}
