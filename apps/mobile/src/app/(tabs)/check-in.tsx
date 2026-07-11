import { FeatureCard } from '@/components/FeatureCard';
import { Screen } from '@/components/Screen';

export default function CheckInScreen() {
  return (
    <Screen title="Check in" subtitle="Capture the meal now; make it useful for you and your friends later.">
      <FeatureCard badge="Step 1" title="Add a photo" body="Take a picture or choose one from your library." />
      <FeatureCard badge="Step 2" title="Attach place + menu" body="Choose the branch and one or more menu items." />
      <FeatureCard badge="Step 3" title="Quick review" body="Order again? Taste, value, portion, and expectation—without stars." />
    </Screen>
  );
}

