import { Bios } from '@/@types/BioSignals';
import { Atmosphere } from '@/@types/Bodies';

export default function predictBioSpecies(body: Body) {
    const possibilities = [];

    for (const genus in Bios) {
        for (let i = 0; i < Bios[genus].length; i++) {
            const species = Bios[genus][i];
            const bodyAtmosphere: Atmosphere = Atmosphere[body.Atmosphere as keyof typeof Atmosphere];

            if (species.planetClass && !species.planetClass.includes(body.PlanetClass)) {
                continue;
            }

            if (species.maxGravity && (body.SurfaceGravity / 9.8) > species.maxGravity) {
                continue;
            }

            if (species.atmosphere && !species.atmosphere.includes(bodyAtmosphere)) {
                continue;
            }

            if (species.volcanism && !(new RegExp(`${species.volcanism.join('|')}`)).test(body.Volcanism)) {
                continue;
            }

            if (species.minTemperature && body.SurfaceTemperature < species.minTemperature) {
                continue;
            }

            if (species.maxTemperature && body.SurfaceTemperature > species.maxTemperature) {
                continue;
            }

            if (species.minDistanceFromStar && body.DistanceFromArrivalLS < species.minDistanceFromStar) {
                continue;
            }

            // if ('parentStar' in species && !species.parentStar.includes(body.System.PrimaryStarType)) {
            //     continue;
            // }

            possibilities.push(`${genus} ${species.species}`);
        }
    }

    return possibilities;
}
