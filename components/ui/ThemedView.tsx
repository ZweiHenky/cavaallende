import { SafeAreaView } from "react-native-safe-area-context";

export function ThemedView({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="bg-primary flex-1 px-2">
      {children}
    </SafeAreaView>
  );
}
