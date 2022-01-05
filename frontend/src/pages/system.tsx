import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as d3 from 'd3';

import {setCommanderLastPosition} from '../../redux/actions/commander';
import {setCurrentSystem} from '../../redux/actions/system';

import parseCelestialBodies from '../util/parseCelestialBodies';

import celestialBodyImages from '../json/celestialBodyImages.json';

import styles from '../styles/layout.module.scss';
import systemStyles from '../styles/system.module.scss';

const mapBodiesForRender = (bodies, depth = 0) => {
    return bodies.map((body, idx) => {
        const size = body.isStar ? 200 : depth <= 1 ? 100 : 50;

        return <div key={idx} className={systemStyles.system}>
            <div className={body.isStar ? systemStyles.star : systemStyles.body}>
                <span className={systemStyles.name}>{body.body.name}</span>
                {body.iconName
                    ? <Image src={`/img/Bodies/${celestialBodyImages[body.iconName]}`} width={size} height={size} title={body.body.subType} />
                    : <Image src="/img/Bodies/Unknown.png" width={size} height={size} title={body.body.subType} />}
            </div>
            {body.children.length > 0 ?
            <div className={systemStyles[`children${depth}`]}>
                {mapBodiesForRender(body.children, depth + 1)}
            </div>
             : null}
        </div>;
    });
};

const addBody = (svg, body, x = 0, y = 0) => {
    svg.append('image')
        .attr('xlink:href', `/img/Bodies/${celestialBodyImages[body.iconName]}`)
        .attr('width', 100)
        .attr('height', 100)
        .attr('x', x)
        .attr('y', y);
}

const drawSystem = (svgRef, systemInformation) => {
    const bodies = systemInformation && systemInformation.hasOwnProperty('bodies') ? parseCelestialBodies(systemInformation.bodies) : [];

    const svg = d3.select(svgRef.current);

    svg.attr('width', 1800);
    svg.attr('height', 500);
    let x = 0;
    let y = 0;

    bodies.forEach(body => {
        addBody(svg, body, x, y);

        if (body.children.length > 0) {
            y += 120;
            body.children.forEach(b => {
                addBody(svg, b, x, y);
                x += 120;
            })
        } else {
            x += 120;
        }
    });
}

export default function System({EDSMClient}) {
    const dispatch = useDispatch();

    const commanderLastPosition = useSelector(state => state.commander.lastPosition);
    const systemInformation = useSelector(state => state.system.currentSystem);

    const [editingMode, setEditingMode] = useState(false);
    const [query, setQuery] = useState('');

    const svg = useRef(null);

    useEffect(() => {
        if (!commanderLastPosition) {
            EDSMClient.getCommanderLastPosition().then(cmdrPos => {
                dispatch(setCommanderLastPosition(cmdrPos));

                EDSMClient.getSystemCelestialBodies(cmdrPos.system).then(systeminfo => {
                    dispatch(setCurrentSystem(systeminfo));
                });
            });
        } else if (!systemInformation) {
            EDSMClient.getSystemCelestialBodies(commanderLastPosition.system).then(systeminfo => {
                dispatch(setCurrentSystem(systeminfo));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        drawSystem(svg, systemInformation);
    }, [svg, systemInformation]);

    const systemBodies = systemInformation && systemInformation.hasOwnProperty('bodies') ?
        systemInformation.bodyCount === systemInformation.bodies.length
            ? systemInformation.bodyCount
            : `${systemInformation.bodyCount} (${systemInformation.bodyCount - systemInformation.bodies.length} undiscovered)`
        : null;

    const parsedBodies = systemInformation && systemInformation.hasOwnProperty('bodies') ? parseCelestialBodies(systemInformation.bodies) : [];
    const renderedBodies = mapBodiesForRender(parsedBodies);

    const searchSystem = systemName => {
        EDSMClient.getSystemCelestialBodies(systemName).then(systeminfo => {
            dispatch(setCurrentSystem(systeminfo));
        });
    }

    const editModeElements = <div>
        <input type="text" onChange={e => setQuery(e.target.value)} value={query} />
        <button type="button" className={`${styles.button} far fa-check-circle`} onClick={e => {setEditingMode(false); searchSystem(query)}}></button>
        <button type="button" className={`${styles.button} far fa-times-circle`} onClick={e => {setEditingMode(false); searchSystem(commanderLastPosition.system)}}></button>
    </div>;

    const viewModeElements = <div onClick={() => setEditingMode(!editingMode)}>
        <span className={styles.label}>Name:</span>
        <span className={styles.value}>{systemInformation ? systemInformation.name : null}</span>
    </div>;

    return (
        <>
            {editingMode ? editModeElements : viewModeElements}
            <div>
                <span className={styles.label}>Bodies:</span>
                <span className={styles.value}>{systemBodies}</span>
            </div>
            <svg ref={svg} />
            {renderedBodies}
        </>
    )
}
