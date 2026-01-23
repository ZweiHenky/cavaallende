import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ThemedScrollProps {
  children: React.ReactNode,
  className?: string
}

export default function ThemedScroll({ children, className='' }: ThemedScrollProps) {
  return (
    <SafeAreaView 
      className={`flex-1 bg-white px-2 `}
    >
      <ScrollView 
        className={`flex-1 ${className}`}
        contentContainerStyle={{
          gap: 40
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
