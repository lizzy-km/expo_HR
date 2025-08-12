import { useEffect } from 'react';
import { Alert } from 'react-native';
import * as Updates from 'expo-updates';

function UpdateChecker() {
    useEffect(() => {
        async function checkForUpdates() {
            try {
                const update = await Updates.checkForUpdateAsync();

                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync();
                    Alert.alert(
                        'Update Available',
                        'A new version of the app is available. Restart to apply the update.',
                        [
                            { text: 'Later', style: 'cancel' },
                            { text: 'Restart Now', onPress: async () => await Updates.reloadAsync() },
                        ]
                    );
                }
            } catch (error) {
                // Handle errors
                console.error('Error fetching latest update', error);
            }
        }

        checkForUpdates();
    }, []);

    return null; // This component doesn't render anything
}

export default UpdateChecker;