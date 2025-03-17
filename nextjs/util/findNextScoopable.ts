import calculateDistance from './calculateDistance';
import getSystemCoordinates from './getSystemCoordinates';

const scoopableStarTypes = ['O', 'B', 'A', 'F', 'G', 'K', 'M', 'B_BlueWhiteSupergiant', 'A_BlueWhiteSupergiant', 'F_WhiteSupergiant', 'G_WhiteYellowSupergiant', 'K_OrangeGiant', 'M_RedGiant', 'M_RedSupergiant'];

export default function findNextScoopable(route: CurrentRoute[]): string {
    if (route.length <= 1) return '';

    let distanceToScoopable = 0;
    let stopsToScoopable = 1;
    let foundScoopable = false;

    for (let i = 1; i < route.length; i++) {
        const prevCoor: Coordinates = getSystemCoordinates(route[i - 1].System);
        const curCoor: Coordinates = getSystemCoordinates(route[i].System);

        distanceToScoopable += calculateDistance(prevCoor, curCoor);

        if (!scoopableStarTypes.includes(route[i].System.PrimaryStarType)) {
            stopsToScoopable += 1;
        } else {
            foundScoopable = true;
            break;
        }
    }

    if (distanceToScoopable === 0) return '';

    if (!foundScoopable) return 'No scoopable stars found in route';

    return `${stopsToScoopable} jumps (${distanceToScoopable.toFixed(2)} ly)`;
}
