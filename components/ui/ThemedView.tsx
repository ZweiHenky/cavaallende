import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedViewProps {
  children: React.ReactNode
  className?: string
}

export function ThemedView({ children, className }: ThemedViewProps) {

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
      className={
        "bg-background " + (className ? className + " flex-1 px-2" : " flex-1 px-2")
      }
      >
      {children}
    </SafeAreaView>
  );
}
