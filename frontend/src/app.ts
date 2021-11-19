import EDSMClient from './EDSM/APIClient';
import calculateDistance from './util/calculateDistance';

const getPosition = async (client: EDSMClient): Promise<void> => {
    const clookieSystems = ["Clookie FL-Y d3","Clookie HV-Y d3","Clookie HP-A d3","Clookie PG-Y d4","Clookie GP-A d4","Clookie NA-A d4","Clookie RG-Y d4","Clookie ZY-Z d4","Clookie SG-Y d4","Clookie BB-A c0","Clookie XK-A c0","Clookie LO-B c0","Clookie VJ-Z e32","Clookie RT-Z d4","Clookie FA-A e20","Clookie CL-Y e4","Clookie EL-Y e4","Clookie YO-A e4","Clookie UJ-Z e5","Clookie ZE-Z e6","Clookie UJ-Z e7","Clookie AA-A e8","Clookie VO-A f26","Clookie ZE-Z e3","Clookie IL-Y e3","Clookie XY-A e6","Clookie JA-A d1","Clookie CP-A d0","Clookie EU-A d0","Clookie EK-Z d0","Clookie XJ-A f90","Clookie SI-B e11","Clookie XJ-A f96","Clookie UO-Z e13","Clookie IG-Y e2","Clookie IL-Y e2","Clookie QL-Y d0","Clookie OQ-Y d0","Clookie LK-A d0","Clookie CL-Y g30","Clookie YE-A g31","Clookie ZE-A g31","Clookie YE-A g37","Clookie YE-A g39","Clookie YE-A g43","Clookie YE-A g54","Clookie YE-A g58","Clookie YE-A g59","Clookie DL-Y g59","Clookie DL-Y g61"];

    const position = await client.getCommanderLastPosition();
    const systems = await client.getSystemsInformation(clookieSystems);

    // client.debug(position);
    // client.debug(systems);
    const mappedSystems = systems.map(system => {
        return {
            name: system.name,
            distance: calculateDistance(position.coordinates, system.coords),
            primaryStar: system.primaryStar
        };
    }).sort((a, b) => a.distance - b.distance);

    client.debug(mappedSystems);
}

const getNearestSystems = async (client: EDSMClient): Promise<void> => {
    const curPosition = await client.getCommanderLastPosition();
    client.debug(`Current system: ${curPosition.system}`);

    const systems = await client.getSystemsInSphere(curPosition.system, curPosition.coordinates.x, curPosition.coordinates.y, curPosition.coordinates.z, 0, 20);

    const sortedSystems = systems.sort((a, b) => a.distance - b.distance);

    const scoopableSystems = sortedSystems.filter(sys => sys.primaryStar.hasOwnProperty('isScoopable') && sys.primaryStar['isScoopable'] === true);
    // client.debug(scoopableSystems);

    const uncertainCoordsSystems = sortedSystems.filter(sys => sys.coordsLocked === false);
    client.debug(uncertainCoordsSystems);
}

window.addEventListener('load', () => {
    const apiKey: string = process.env.EDSM_API_KEY;
    const commanderName: string = process.env.COMMANDER_NAME;

    const client: EDSMClient = new EDSMClient(apiKey, commanderName);

    // getPosition(client);
    getNearestSystems(client);
})
