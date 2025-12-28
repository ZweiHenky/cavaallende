
import { ThemedView } from '@/components/ui/ThemedView';
import { authClient } from '@/lib/auth-client';
import { StyleSheet, Text, } from 'react-native';



export default function HomeScreen() {

  const { data: session } = authClient.useSession();

  return (
    <ThemedView>
      <Text>{session?.user?.name}</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

});
