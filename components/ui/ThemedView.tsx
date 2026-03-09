import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedViewProps {
  children: React.ReactNode
}

export function ThemedView({ children }: ThemedViewProps) {


  return (
    <SafeAreaView 
      edges={
        [
          'left',
          'right',
          "top",
          "bottom"
        ]
      }
      className="bg-background flex-1 px-2 pb--"
      >
      {children}
    </SafeAreaView>
  );
}
