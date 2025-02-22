import calculateDistance from './calculateDistance';

const scoopableStarTypes = ['O', 'B', 'A', 'F', 'G', 'K', 'M', 'B_BlueWhiteSupergiant', 'A_BlueWhiteSupergiant', 'F_WhiteSupergiant', 'G_WhiteYellowSupergiant', 'K_OrangeGiant', 'M_RedGiant', 'M_RedSupergiant'];

export default function findNextScoopable(route: CurrentRoute[]): string {
    if (route.length <= 1) return '';

    let distanceToScoopable = 0;
    let stopsToScoopable = 0;

    for (let i = 1; i < route.length; i++) {
        if (!scoopableStarTypes.includes(route[i].System.PrimaryStarType)) {
            const prevCoor: Coordinates = { x: route[i - 1].System.StarPosX, y: route[i - 1].System.StarPosY, z: route[i - 1].System.StarPosZ }
            const curCoor: Coordinates = { x: route[i].System.StarPosX, y: route[i].System.StarPosY, z: route[i - 1].System.StarPosZ }

            distanceToScoopable += calculateDistance(prevCoor, curCoor);
            stopsToScoopable += 1;
        } else {
            break;
        }
    }

    if (distanceToScoopable === 0) return '';

    return `Next scoopable star in ${stopsToScoopable} jumps (${distanceToScoopable.toFixed(2)} ly)`;
}
