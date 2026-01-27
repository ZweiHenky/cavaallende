import { SafeAreaView } from "react-native-safe-area-context";

interface ThemedViewProps {
  children: React.ReactNode
  withPaddingBottom?: boolean
}

export function ThemedView({ children, withPaddingBottom = true }: ThemedViewProps) {

  if (withPaddingBottom === false) {
    return (
      <SafeAreaView 
        edges={[
          'left',
          'right',
          "top",
          "bottom"
        ]}
        className="bg-background flex-1 px-2"
        >
        {children}
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView 
      edges={
        [
          'left',
          'right',
          "top",
        ]
      }
      className="bg-background flex-1 px-2 pb-8"
      >
      {children}
    </SafeAreaView>
  );
}
