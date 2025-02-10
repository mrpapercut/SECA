import { translateDiscordState } from './translateState';

export async function setActivity(state: string, systemName: string, bodyName?: string): Promise<void> {
    if (!state || state === '') return;

    const discordState = translateDiscordState(state, systemName, bodyName);

    await fetch(`http://${window.location.hostname}:3001/update`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'post',
        body: JSON.stringify({ state: discordState })
    });
}
