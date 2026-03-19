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
        className ? className + "bg-background flex-1 px-2" : "bg-background flex-1 px-2"
      }
      >
      {children}
    </SafeAreaView>
  );
}
