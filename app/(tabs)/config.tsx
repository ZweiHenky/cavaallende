import { ThemedView } from '@/components/ui/ThemedView'
import { ScrollView } from 'react-native'
import { authClient } from '@/lib/auth-client'
import Loading from '@/components/ui/Loading'
import UserCard from '@/components/config/UserCard'
import PreferencesCard from '@/components/config/PreferencesCard'
import HelpCard from '@/components/config/HelpCard'

export default function Config() {
    const { isPending } = authClient.useSession()

    if (isPending) {
        return (
            <ThemedView>
                <Loading />
            </ThemedView>
        )
    }

    return (
        <ThemedView>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <UserCard />
                <PreferencesCard />
                <HelpCard />
            </ScrollView>
        </ThemedView>
    )
}

