import { SafeAreaView } from "react-native-safe-area-context";

export function ThemedView({ children }: { children: React.ReactNode }) {



  return (
    <SafeAreaView 
      edges={
        [
          'left',
          'right',
          "top"
        ]
      }
      className="bg-primary flex-1 px-2 pb-8"
      >
      {children}
    </SafeAreaView>
  );
}
