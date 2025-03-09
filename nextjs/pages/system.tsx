import { useState, useEffect } from 'react';
import Image from "next/image";

import { useSocket } from '@/contexts/SocketContext';

import getBodyIcon from '@/util/getBodyIcon';
import calculateDistance from '@/util/calculateDistance';

import styles from '../styles/layout.module.scss';
import { PlanetClass } from '@/@types/Bodies';

function getBodyImageSize(body: Body): number {
    let imgWidth = 100;

    if (body.BodyType === 'Star') {
        if (body.StellarMass <= 1.5) imgWidth = 250 * body.StellarMass;
        else imgWidth = 100 * body.StellarMass;
    } else {
        if (body.MassEM < 0.01) imgWidth = 10000 * body.MassEM;
        else if (body.MassEM < 0.1) imgWidth = 1000 * body.MassEM;
        else imgWidth = 100 * body.MassEM;
    }

    // Clamp between 50 and 200px
    imgWidth = Math.min(200, Math.max(50, imgWidth));

    return imgWidth;
}

function getBodyStateIcons(body: Body): React.ReactNode {
    const icons = [];

    icons.push(body.Discovered && !body.WasDiscovered ? 'discovered-first' : body.Discovered ? 'discovered-self' : body.WasDiscovered ? 'discovered-active' : 'discovered-inactive');
    if (body.BodyType === 'Planet') {
        icons.push(body.Mapped && !body.WasMapped ? 'mapped-first' : body.Mapped ? 'mapped-self' : body.WasMapped ? 'mapped-active' : 'mapped-inactive');
        icons.push(body.Footfall ? 'footfall-self' : 'footfall-inactive');
    }

    return <>
        {icons.map(icon => <Image key={`icon_${icon}`} src={`/images/icons/${icon}.png`} width={48} height={48} alt={icon} />)}
    </>
}

function getSystemDistances(currentSystem: System): Record<string, number> {
    const systems: Record<string, Coordinates> = {
        Sol: {x: 0, y: 0, z: 0},
        Ruwachis: {x: 83.96875, y: -22.3125, z: 83.125},
        Colonia: {x: -9530.5, y: -910.28125, z: 19808.125},
        'Sagittarius A*': {x: 25.21875, y: -20.90625, z: 25899.96875},
        'Beagle Point': {x: -1111.5625, y: -134.21875, z: 65269.75}
    }

    const distances: Record<string, number> = {}
    const currentCoordinates: Coordinates = {x: currentSystem.StarPosX, y: currentSystem.StarPosY, z: currentSystem.StarPosZ}

    for (const s in systems) {
        distances[s] = calculateDistance(currentCoordinates, systems[s])
    }

    return distances
}

function getSystemMoonStats(currentSystem: System): Record<string, {name: string, value: number}> {
    const moonRegex = new RegExp('\\s[a-z]$');
    const moons = currentSystem.Bodies.filter(b => moonRegex.test(b.Name) && b.WasDiscovered === false && b.Discovered === true);

    if (moons.length === 0) return {};

    const livableMoons = moons.filter(m => m.TerraformState !== '' || m.PlanetClass === PlanetClass.WaterWorld || m.PlanetClass === PlanetClass.EarthLikeWorld);

    const res = {
        moonsInSystem: {name: currentSystem.Name, value: moons.length},
        livableMoons: {name: currentSystem.Name, value: livableMoons.length},
        moonsPerBody: {name: '', value: 0},
        closestOrbit: {name: '', value: Number.MAX_SAFE_INTEGER},
        fastestOrbit: {name: '', value: Number.MAX_SAFE_INTEGER},
        fastestRotating: {name: '', value: Number.MAX_SAFE_INTEGER},
        heaviest: {name: '', value: 0},
        lightest: {name: '', value: Number.MAX_SAFE_INTEGER},
        largest: {name: '', value: 0},
        smallest: {name: '', value: Number.MAX_SAFE_INTEGER},
        highestGravity: {name: '', value: 0},
        mostBioSignals: {name: '<none>', value: 0},
    }

    for (let i = 0; i < moons.length; i++) {
        const moon = moons[i];
        const moonName = moon.Name.replace(currentSystem.Name, '');

        if (moon.SemiMajorAxis < res.closestOrbit.value) res.closestOrbit = {name: moonName, value: moon.SemiMajorAxis};
        if (moon.OrbitalPeriod < res.fastestOrbit.value) res.fastestOrbit = {name: moonName, value: moon.OrbitalPeriod};
        if (moon.RotationPeriod < res.fastestRotating.value) res.fastestRotating = {name: moonName, value: moon.RotationPeriod};
        if (moon.MassEM > res.heaviest.value) res.heaviest = {name: moonName, value: moon.MassEM};
        if (moon.MassEM < res.lightest.value) res.lightest = {name: moonName, value: moon.MassEM};
        if (moon.Radius > res.largest.value) res.largest = {name: moonName, value: moon.Radius};
        if (moon.Radius < res.smallest.value) res.smallest = {name: moonName, value: moon.Radius};
        if (moon.SurfaceGravity > res.highestGravity.value) res.highestGravity = {name: moonName, value: moon.SurfaceGravity};

        const moonSignals = moon.signals?.filter(s => s.Type === 'Biological').length || 0;
        if (moonSignals > res.mostBioSignals.value) res.mostBioSignals = {name: moonName, value: moonSignals};
    }

    return res;
}

export default function System() {
    const {socket, isConnected} = useSocket();
    const [currentSystem, setCurrentSystem] = useState({} as System);

    useEffect(() => {
        if (!socket) return;

        socket.addListener('getCurrentSystem', response => {
            setCurrentSystem(response.system as System)
        });

        if (isConnected) {
            socket.sendMessage('getCurrentSystem');
        }
    }, [socket, isConnected]);

    console.log(currentSystem);
    if (Object.keys(currentSystem).length === 0) {
        return <></>;
    }

    currentSystem.Bodies.sort((a, b) => a.DistanceFromArrivalLS - b.DistanceFromArrivalLS);

    const calculatedDistances = getSystemDistances(currentSystem);

    const moonStats = getSystemMoonStats(currentSystem);
    const hasMoonStats = Object.keys(moonStats).length > 0;

    return <>
        <div>
            <h3>{currentSystem.Name} ({currentSystem.Bodies.length} bodies)</h3>
            <hr className={styles.divider} />
            <div className={styles.grid}>
                {Object.keys(calculatedDistances).map(key => <>
                    <div key={`dist_${key}_label`}>{key}</div>
                    <div key={`dist_${key}_value`}>{calculatedDistances[key].toFixed(2)} ly</div>
                </>)}
            </div>

            {hasMoonStats && <>
                <hr className={styles.divider} />

                <h3>Moons:</h3>
                <div className={styles.grid}>
                    <div>Moons in system</div>
                    <div>{moonStats.moonsInSystem.value}</div>

                    <div>Livable moons</div>
                    <div>{moonStats.livableMoons.value}</div>

                    <div>Closest orbit</div>
                    <div>{moonStats.closestOrbit.name}: {(moonStats.closestOrbit.value / 1000000).toFixed(2)} Mm</div>

                    <div>Fastest orbit</div>
                    <div>{moonStats.fastestOrbit.name}: {(moonStats.fastestOrbit.value / 60 / 60 / 24).toFixed(1)} D</div>

                    <div>Fastest rotating</div>
                    <div>{moonStats.fastestRotating.name}: {(moonStats.fastestRotating.value / 60 / 60 / 24).toFixed(1)} D</div>

                    <div>Heaviest</div>
                    <div>{moonStats.heaviest.name}: {moonStats.heaviest.value.toFixed(4)} EM</div>

                    <div>Lightest</div>
                    <div>{moonStats.lightest.name}: {moonStats.lightest.value.toFixed(4)} EM</div>

                    <div>Largest</div>
                    <div>{moonStats.largest.name}: {(moonStats.largest.value / 1000).toFixed(0)} KM</div>

                    <div>Smallest</div>
                    <div>{moonStats.smallest.name}: {(moonStats.smallest.value / 1000).toFixed(0)} KM</div>

                    <div>Highest gravity</div>
                    <div>{moonStats.highestGravity.name}: {(moonStats.highestGravity.value / 9.80665).toFixed(2)} G</div>

                    {moonStats.mostBioSignals.value > 0 && <>
                        <div>Most bio signals</div>
                        <div>{moonStats.mostBioSignals.name}: {moonStats.mostBioSignals.value}</div>
                    </>}
                </div>
            </>}

            <div className={styles.grid3}>
                {currentSystem.Bodies.map(body => {
                    const isStar = body.BodyType === 'Star';
                    const imgWidth = getBodyImageSize(body);
                    const bodyStatIcons = getBodyStateIcons(body);

                    return <>
                        <hr className={styles.divider} />
                        <div key={`img_${body.BodyID}`} style={{textAlign: 'center'}}>
                            <Image src={getBodyIcon(body)} alt={body.Name} width={imgWidth} height={imgWidth} style={{margin: '0 auto'}}/>
                            <div key={`stats_${body.BodyID}`}>{bodyStatIcons}</div>
                        </div>
                        <div className={styles.grid3} style={{gridColumn: 'span 2'}}>
                            <div>Name:</div>
                            <div style={{gridColumn: 'span 2'}}>{body.Name}</div>

                            <div>Type:</div>
                            <div style={{gridColumn: 'span 2'}}>{isStar ? `Star type ${body.StarType}` : body.PlanetClass}</div>

                            <div>Distance:</div>
                            <div style={{gridColumn: 'span 2'}}>{body.DistanceFromArrivalLS.toFixed(2)} ls</div>

                            {!isStar && <>
                                <div>Landable:</div>
                                <div style={{gridColumn: 'span 2'}}>{body.Landable ? 'Yes' : 'No'}</div>
                            </>}

                            {body.Atmosphere !== '' && <>
                                <div>Atmosphere:</div>
                                <div style={{textTransform: 'capitalize', gridColumn: 'span 2'}}>{body.Atmosphere.replaceAll(' atmosphere', '')}</div>
                            </>}

                            {(body.signals || []).length > 0 && <>
                                <div>Signals:</div>
                                <div style={{gridColumn: 'span 2'}}>{body.signals?.map(s => `${s.Type} (${s.SubType !== '' ? s.SubType.replaceAll(',', ', ') : s.Count})`)}</div>
                            </>}
                        </div>
                    </>
                })}
            </div>
        </div>
    </>
}
