import { StarType, PlanetClass } from '@/@types/Bodies';

export default function getBodyIcon(body: Body): string {
    const basePath = '/images/bodies/';
    const imgSuffix = '.png';
    let iconName: string;

    if (body.BodyType === 'Star') {
        iconName = getStarIcon(body);
    } else if (body.BodyType === 'Planet') {
        iconName = getPlanetIcon(body);
    } else {
        iconName = 'Unknown';
    }

    return `${basePath}${iconName}${imgSuffix}`;
}

function getStarIcon(body: Body): string {
    let iconName = 'NotScanned';

    const starType = body.StarType;

    switch (starType) {
        case StarType.ClassH:
            if (body.StellarMass <= 7) {
                iconName = 'H_stellar';
            } else if (body.StellarMass < 70) {
                iconName = 'H';
            } else {
                iconName = 'H_intermediate';
            }
            break;
        case StarType.ClassSMBH:
            iconName = 'SuperMassiveBlackHole';
            break;
        case StarType.ClassN:
            if (body.StellarMass < 1.1) {
                iconName = 'N';
            } else if (body.StellarMass < 1.9) {
                iconName = 'N_massive';
            } else {
                iconName = 'N_veryMassive';
            }
            break;
        case StarType.ClassD:
        case StarType.ClassDA:
        case StarType.ClassDAB:
        case StarType.ClassDAO:
        case StarType.ClassDAV:
        case StarType.ClassDAZ:
        case StarType.ClassDB:
        case StarType.ClassDBV:
        case StarType.ClassDBZ:
        case StarType.ClassDC:
        case StarType.ClassDCV:
        case StarType.ClassDO:
        case StarType.ClassDOV:
        case StarType.ClassDQ:
        case StarType.ClassDX:
            if (body.SurfaceTemperature <= 5500) {
                iconName = 'D';
            } else if (body.SurfaceTemperature < 8000) {
                iconName = 'D_hot';
            } else if (body.SurfaceTemperature < 14000) {
                iconName = 'D_veryHot';
            } else {
                iconName = 'D_extremelyHot';
            }
            break;
        case StarType.ClassC:
        case StarType.ClassCJ:
        case StarType.ClassCN:
            iconName = 'C';
            break;
        case StarType.ClassAeBe:
            if (body.SurfaceTemperature < 5000) {
                iconName = 'A';
            } else {
                iconName = 'B';
            }
            break;
        case StarType.ClassO:
            iconName = 'O';
            break;
        case StarType.ClassB:
        case StarType.ClassBBlueWhiteSupergiant:
            iconName = 'B';
            break;
        case StarType.ClassA:
        case StarType.ClassABlueWhiteSupergiant:
            iconName = 'A';
            break;
        case StarType.ClassF:
        case StarType.ClassFWhiteSupergiant:
            iconName = 'F';
            break;
        case StarType.ClassG:
        case StarType.ClassGWhiteYellowSupergiant:
            iconName = 'G';
            break;
        case StarType.ClassK:
        case StarType.ClassKOrangeGiant:
            iconName = 'K';
            break;
        case StarType.ClassM:
        case StarType.ClassMRedGiant:
        case StarType.ClassMRedSupergiant:
        case StarType.ClassMS:
        case StarType.ClassS:
            iconName = 'M';
            break;
        case StarType.ClassTTS:
            if (body.SurfaceTemperature < 3700) {
                iconName = 'M';
            } else if (body.SurfaceTemperature < 5200) {
                iconName = 'K';
            } else if (body.SurfaceTemperature < 6000) {
                iconName = 'G';
            } else if (body.SurfaceTemperature < 7500) {
                iconName = 'F';
            } else if (body.SurfaceTemperature < 10000) {
                iconName = 'A';
            } else if (body.SurfaceTemperature < 30000) {
                iconName = 'B';
            } else {
                iconName = 'O';
            }
            break;
        case StarType.ClassL:
            iconName = 'L';
            break;
        case StarType.ClassT:
            iconName = 'T';
            break;
        case StarType.ClassY:
            iconName = 'Y';
            break;
        case StarType.ClassW:
        case StarType.ClassWC:
        case StarType.ClassWN:
        case StarType.ClassWNC:
        case StarType.ClassWO:
            if (body.SurfaceTemperature < 50000) {
                iconName = 'F';
            } else if (body.SurfaceTemperature < 90000) {
                iconName = 'A';
            } else if (body.SurfaceTemperature < 140000) {
                iconName = 'B';
            } else {
                iconName = 'O';
            }
            break;
    }

    return iconName;
}

function getPlanetIcon(body: Body): string {
    let iconName = 'NotScanned';

    const planetType = body.PlanetClass;
    const atmosphere = body.Atmosphere.toLowerCase();

    if (planetType.toLowerCase().indexOf('giant') !== -1) {
        iconName = 'GG1v1';

        switch (planetType) {
            case PlanetClass.GasGiantAmmoniaBasedLife:
                if (body.SurfaceTemperature < 105) iconName = 'GGAv8';
                else if (body.SurfaceTemperature < 110) iconName = 'GGAv11';
                else if (body.SurfaceTemperature < 115) iconName = 'GGAv9';
                else if (body.SurfaceTemperature < 120) iconName = 'GGAv2';
                else if (body.SurfaceTemperature < 124) iconName = 'GGAv12';
                else if (body.SurfaceTemperature < 128) iconName = 'GGAv14';
                else if (body.SurfaceTemperature < 130) iconName = 'GGAv7';
                else if (body.SurfaceTemperature < 134) iconName = 'GGAv13';
                else if (body.SurfaceTemperature < 138) iconName = 'GGAv6';
                else if (body.SurfaceTemperature < 142) iconName = 'GGAv1';
                else if (body.SurfaceTemperature < 148) iconName = 'GGAv3';
                else if (body.SurfaceTemperature < 152) iconName = 'GGAv5';
                else iconName = 'GGAv4';
                break;

            case PlanetClass.GasGiantWaterBasedLife:
                if (body.SurfaceTemperature < 152) {
                    iconName = 'GGWv24';
                } else if (body.SurfaceTemperature < 155) {
                    if (atmosphere.indexOf('oxygen') !== -1) {
                        iconName = 'GGWv1';
                    } else {
                        iconName = 'GGWv16';
                    }
                } else if (body.SurfaceTemperature < 158) iconName = 'GGWv3';
                else if (body.SurfaceTemperature < 160) iconName = 'GGWv14';
                else if (body.SurfaceTemperature < 162) iconName = 'GGWv22';
                else if (body.SurfaceTemperature < 165) iconName = 'GGWv20';
                else if (body.SurfaceTemperature < 172) iconName = 'GGWv25';
                else if (body.SurfaceTemperature < 175) iconName = 'GGWv2';
                else if (body.SurfaceTemperature < 180) iconName = 'GGWv13';
                else if (body.SurfaceTemperature < 185) iconName = 'GGWv9';
                else if (body.SurfaceTemperature < 190) iconName = 'GGWv21';
                else if (body.SurfaceTemperature < 200) iconName = 'GGWv7';
                else if (body.SurfaceTemperature < 205) iconName = 'GGWv8';
                else if (body.SurfaceTemperature < 210) iconName = 'GGWv15';
                else if (body.SurfaceTemperature < 213) iconName = 'GGWv17';
                else if (body.SurfaceTemperature < 216) iconName = 'GGWv6';
                else if (body.SurfaceTemperature < 219) iconName = 'GGWv18';
                else if (body.SurfaceTemperature < 222) iconName = 'GGWv10';
                else if (body.SurfaceTemperature < 225) iconName = 'GGWv11';
                else if (body.SurfaceTemperature < 228) iconName = 'GGWv23';
                else if (body.SurfaceTemperature < 232) iconName = 'GGWv5';
                else if (body.SurfaceTemperature < 236) iconName = 'GGWv12';
                else {
                    if (atmosphere.indexOf('oxygen') !== -1) {
                        iconName = 'GGWv19';
                    } else {
                        iconName = 'GGWv4';
                    }
                }
                break;

            case PlanetClass.HeliumGasGiant:
                if (body.SurfaceTemperature < 110) {
                    if (atmosphere.indexOf('antimony') !== -1 || atmosphere.indexOf('cadmium') !== -1 || atmosphere.indexOf('niobium') !== -1) {
                        iconName = 'GGHv7';
                    } else {
                        iconName = 'GGHv3';
                    }
                } else if (body.SurfaceTemperature < 125) iconName = 'GGHv6';
                else if (body.SurfaceTemperature < 140) iconName = 'GGHv2';
                else if (body.SurfaceTemperature < 180) iconName = 'GGHv5';
                else if (body.SurfaceTemperature < 270) iconName = 'GGHv4';
                else if (body.SurfaceTemperature < 600) iconName = 'GGHv1';
                else if (body.SurfaceTemperature < 700) iconName = 'GGHv9';
                else iconName = 'GGHv8';
                break;

            case PlanetClass.ClassIGasGiant:
                if (body.SurfaceTemperature <= 30) iconName = 'GG1v12';
                else if (body.SurfaceTemperature < 35) iconName = 'GG1v15';
                else if (body.SurfaceTemperature < 40) iconName = 'GG1v13';
                else if (body.SurfaceTemperature < 45) iconName = 'GG1v4'; // neptune
                else if (body.SurfaceTemperature < 50) iconName = 'GG1v9';
                else if (body.SurfaceTemperature < 55) iconName = 'GG1v2';
                else if (body.SurfaceTemperature < 60) iconName = 'GG1v16'; // uranus
                else if (body.SurfaceTemperature < 65) iconName = 'GG1v19';
                else if (body.SurfaceTemperature < 70) iconName = 'GG1v18';
                else if (body.SurfaceTemperature < 78) iconName = 'GG1v11';
                else if (body.SurfaceTemperature < 85) iconName = 'GG1v3';
                else if (body.SurfaceTemperature < 90) iconName = 'GG1v6';
                else if (body.SurfaceTemperature < 100) iconName = 'GG1v8';
                else if (body.SurfaceTemperature < 110) iconName = 'GG1v1';
                else if (body.SurfaceTemperature < 130) iconName = 'GG1v5';
                else if (body.SurfaceTemperature < 135) iconName = 'GG1v17';
                else if (body.SurfaceTemperature < 140) iconName = 'GG1v20';
                else if (body.SurfaceTemperature < 150) iconName = 'GG1v14'; // jupiter
                else if (body.SurfaceTemperature < 170) iconName = 'GG1v7';
                else iconName = 'GG1v10';
                break;

            case PlanetClass.ClassIIGasGiant:
                if (body.SurfaceTemperature < 160) iconName = 'GG2v4';
                else if (body.SurfaceTemperature < 175) iconName = 'GG2v7';
                else if (body.SurfaceTemperature < 200) iconName = 'GG2v5';
                else if (body.SurfaceTemperature < 245) iconName = 'GG2v8';
                else if (body.SurfaceTemperature < 260) iconName = 'GG2v6';
                else if (body.SurfaceTemperature < 275) iconName = 'GG2v1';
                else if (body.SurfaceTemperature < 300) iconName = 'GG2v2';
                else iconName = 'GG2v3';
                break;

            case PlanetClass.ClassIIIGasGiant:
                if (body.SurfaceTemperature < 300) iconName = 'GG3v2';
                else if (body.SurfaceTemperature < 340) iconName = 'GG3v3';
                else if (body.SurfaceTemperature < 370) iconName = 'GG3v12';
                else if (body.SurfaceTemperature < 400) iconName = 'GG3v1';
                else if (body.SurfaceTemperature < 500) iconName = 'GG3v5';
                else if (body.SurfaceTemperature < 570) iconName = 'GG3v4';
                else if (body.SurfaceTemperature < 600) iconName = 'GG3v8';
                else if (body.SurfaceTemperature < 620) iconName = 'GG3v10';
                else if (body.SurfaceTemperature < 660) iconName = 'GG3v7';
                else if (body.SurfaceTemperature < 700) iconName = 'GG3v9';
                else if (body.SurfaceTemperature < 742) iconName = 'GG3v11';
                else if (body.SurfaceTemperature < 760) iconName = 'GG3v13';
                else iconName = 'GG3v6';
                break;

            case PlanetClass.ClassIVGasGiant:
                if (body.SurfaceTemperature < 810) iconName = 'GG4v9';
                else if (body.SurfaceTemperature < 830) iconName = 'GG4v6';
                else if (body.SurfaceTemperature < 880) iconName = 'GG4v4';
                else if (body.SurfaceTemperature < 950) iconName = 'GG4v10';
                else if (body.SurfaceTemperature < 1010) iconName = 'GG4v3';
                else if (body.SurfaceTemperature < 1070) iconName = 'GG4v1';
                else if (body.SurfaceTemperature < 1125) iconName = 'GG4v7';
                else if (body.SurfaceTemperature < 1200) iconName = 'GG4v2';
                else if (body.SurfaceTemperature < 1220) iconName = 'GG4v13';
                else if (body.SurfaceTemperature < 1240) iconName = 'GG4v11';
                else if (body.SurfaceTemperature < 1270) iconName = 'GG4v8';
                else if (body.SurfaceTemperature < 1300) iconName = 'GG4v12';
                else iconName = 'GG4v5';
                break;

            case PlanetClass.ClassVGasGiant:
                if (body.SurfaceTemperature < 1600) iconName = 'GG5v3';
                else if (body.SurfaceTemperature < 1620) iconName = 'GG5v4';
                else if (body.SurfaceTemperature < 1700) iconName = 'GG5v1';
                else if (body.SurfaceTemperature < 1850) iconName = 'GG5v2';
                else iconName = 'GG5v5';
                break;

            case PlanetClass.WaterGiant:
                if (body.SurfaceTemperature < 155) iconName = 'WTGv6';
                else if (body.SurfaceTemperature < 160) iconName = 'WTGv2';
                else if (body.SurfaceTemperature < 165) iconName = 'WTGv1';
                else if (body.SurfaceTemperature < 170) iconName = 'WTGv3';
                else if (body.SurfaceTemperature < 180) iconName = 'WTGv4';
                else if (body.SurfaceTemperature < 190) iconName = 'WTGv5';
                else iconName = 'WTGv7';
                break;
        }

        return iconName;
    }

    switch (planetType) {
        case PlanetClass.AmmoniaWorld:
            iconName = 'AMWv1';

            if (body.TerraformState !== '') iconName = 'AMWv2';
            else if (atmosphere.indexOf('thick') !== -1 || atmosphere.indexOf('hot') !== -1) iconName = 'AMWv3';
            else if (atmosphere.indexOf('rich') !== -1) iconName = 'AMWv4';
            else if (body.Landable && (body.Atmosphere === '' && body.SurfaceTemperature < 140)) iconName = 'AMWv5';
            else if (body.SurfaceTemperature < 190) iconName = 'AMWv6';
            else if (body.SurfaceTemperature < 200) iconName = 'AMWv3';
            else if (body.SurfaceTemperature < 210) iconName = 'AMWv1';
            else iconName = 'AMWv4';
            break;

        case PlanetClass.EarthLikeWorld:
            iconName = 'ELWv5';

            if (Math.round(body.MassEM) === 1 && body.SurfaceTemperature < 288) {
                iconName = 'ELWv1';
            } else {
                if (body.TidalLock) {
                    iconName = 'ELWv7';
                } else {
                    if (body.MassEM < 0.15 && body.SurfaceTemperature < 262) iconName = 'ELWv4';
                    else if (body.SurfaceTemperature < 270) iconName = 'ELWv8';
                    else if (body.SurfaceTemperature < 285) iconName = 'ELWv2';
                    else if (body.SurfaceTemperature < 300) iconName = 'ELWv3';
                    else iconName = 'ELWv5';
                }
            }
            break;

        case PlanetClass.HighMetalContentBody:
            iconName = 'HMCv3';

            if (body.Landable || atmosphere === '') {
                if (body.SurfaceTemperature < 300) iconName = body.TidalLock ? 'HMCv30' : 'HMCv27';
                else if (body.SurfaceTemperature < 500) iconName = 'HMCv34';
                else if (body.SurfaceTemperature < 700) iconName = 'HMCv32';
                else if (body.SurfaceTemperature < 900) iconName = 'HMCv31';
                else if (body.SurfaceTemperature < 1000) iconName = body.TidalLock ? 'HMCv33' : 'HMCv35';
                else iconName = 'HMCv36';
            } else if (!body.Landable) {
                if (atmosphere.indexOf('ammonia') !== -1) iconName = body.TidalLock ? 'HMCv29' : 'HMCv17';
                else if (atmosphere.indexOf('argon') !== -1) iconName = 'HMCv26';
                else if (atmosphere.indexOf('carbon') !== -1) {
                    if (body.SurfaceTemperature < 220) iconName = 'HMCv9';
                    else if (body.SurfaceTemperature < 250) iconName = 'HMCv12';
                    else if (body.SurfaceTemperature < 285) iconName = 'HMCv6';
                    else if (body.SurfaceTemperature < 350) iconName = 'HMCv28';
                    else if (body.SurfaceTemperature < 400) iconName = body.TidalLock ? 'HMCv7' : 'HMCv8';
                    else if (body.SurfaceTemperature < 600) iconName = body.TidalLock ? 'HMCv1' : 'HMCv24';
                    else if (body.SurfaceTemperature < 700) iconName = 'HMCv3';
                    else if (body.SurfaceTemperature < 900) iconName = 'HMCv25';
                    else if (body.SurfaceTemperature > 1250) iconName = 'HMCv14';
                    else iconName = 'HMCv18';
                } else if (atmosphere.indexOf('methane') !== -1) iconName = body.TidalLock ? 'HMCv19' : 'HMCv11';
                else if (atmosphere.indexOf('nitrogen') !== -1) iconName = body.SurfaceTemperature < 200 ? 'HMCv2' : 'HMCv5';
                else if (atmosphere.indexOf('sulphur') !== -1) iconName = body.SurfaceTemperature < 700 ? 'HMCv23' : 'HMCv37';
                else if (atmosphere.indexOf('water') !== -1) {
                    if (body.SurfaceTemperature < 400) iconName = 'HMCv4';
                    else if (body.SurfaceTemperature < 700) iconName = 'HMCv13';
                    else if (body.SurfaceTemperature < 1000) iconName = 'HMCv16';
                    else iconName = 'HMCv20';
                } else iconName = 'HMCv3';
            } else iconName = 'HMCv3';
            break;

        case PlanetClass.IcyBody:
            iconName = 'ICYv4';

            if (body.Landable) iconName = 'ICYv7';
            else {
                if (atmosphere.indexOf('helium') !== -1) iconName = 'ICYv10';
                else if (atmosphere.indexOf('neon') !== -1) iconName = body.SurfaceTemperature < 55 ? 'ICYv6' : 'ICYv9';
                else if (atmosphere.indexOf('argon') !== -1) iconName = body.SurfaceTemperature < 100 ? 'ICYv1' : 'ICYv5';
                else if (atmosphere.indexOf('nitrogen') !== -1) {
                    if (body.SurfaceTemperature < 105) iconName = 'ICYv2';
                    else if (body.SurfaceTemperature < 150) iconName = 'ICYv3';
                    else iconName = 'ICYv4';
                } else if (atmosphere.indexOf('methane') !== -1) iconName = body.TidalLock ? 'ICYv3' : 'ICYv8';
                else iconName = 'ICYv5';
            }
            break;

        case PlanetClass.MetalRichBody:
            iconName = 'MRBv1';

            if (body.Landable) {
                if (body.SurfaceTemperature < 1000) iconName = 'MRBv7';
                else if (body.SurfaceTemperature < 1200) iconName = 'MRBv2';
                else if (body.SurfaceTemperature < 2000) iconName = 'MRBv12';
                else iconName = 'MRBv8';
            } else {
                if (body.SurfaceTemperature < 1600) iconName = 'MRBv9';
                else if (body.SurfaceTemperature < 1800) iconName = 'MRBv3';
                else if (body.SurfaceTemperature < 1900) iconName = 'MRBv4';
                else if (body.SurfaceTemperature < 2000) iconName = 'MRBv10';
                else if (body.SurfaceTemperature < 2200) iconName = 'MRBv11';
                else if (body.SurfaceTemperature < 2400) iconName = 'MRBv14';
                else if (body.SurfaceTemperature < 2600) iconName = 'MRBv8';
                else if (body.SurfaceTemperature < 3500) iconName = 'MRBv13';
                else if (body.SurfaceTemperature < 5000) iconName = 'MRBv1';
                else if (body.SurfaceTemperature < 6000) iconName = 'MRBv5';
                else iconName = 'MRBv6'
            }
            break;

        case PlanetClass.RockyBody:
            iconName = 'RBDv1';

            if (body.SurfaceTemperature === 55 && !body.Landable) iconName = 'RBDv6';
            else if (body.SurfaceTemperature < 150) iconName = 'RBDv2';
            else if (body.SurfaceTemperature < 300) iconName = 'RBDv1';
            else if (body.SurfaceTemperature < 400) iconName = 'RBDv3';
            else if (body.SurfaceTemperature < 500) iconName = 'RBDv4';
            else iconName = 'RBDv5';
            break

        case PlanetClass.RockyIceBody:
            iconName = 'RIBv1';

            if (body.SurfaceTemperature < 50) iconName = 'RIBv1';
            else if (body.SurfaceTemperature < 150) iconName = 'RIBv2';
            else iconName = 'RIBv4';

            if (body.TidalLock) iconName = 'RIBv3';
            else if (atmosphere.indexOf('thick') !== -1 || atmosphere.indexOf('rich') !== -1) iconName = 'RIBv4';
            else if (atmosphere.indexOf('hot') !== -1 || atmosphere.indexOf('thin') !== -1) iconName = 'RIBv1';
            break;

        case PlanetClass.WaterWorld:
            iconName = 'WTRv7';

            if (atmosphere === '') iconName = 'WTRv10';
            else {
                if (atmosphere.indexOf('carbon') !== -1) {
                    if (body.SurfaceTemperature < 260) iconName = 'WTRv6';
                    else if (body.SurfaceTemperature < 280) iconName = 'WTRv5';
                    else if (body.SurfaceTemperature < 300) iconName = 'WTRv7';
                    else if (body.SurfaceTemperature < 400) iconName = 'WTRv2';
                    else iconName = 'WTRv11';
                } else if (atmosphere.indexOf('ammonia') !== -1) {
                    if (body.TidalLock) iconName = 'WTRv12';
                    else if (body.SurfaceTemperature < 275) iconName = 'WTRv1';
                    else if (body.SurfaceTemperature < 350) iconName = 'WTRv13';
                    else if (body.SurfaceTemperature < 380) iconName = 'WTRv9';
                    else iconName = 'WTRv4';
                } else if (atmosphere.indexOf('nitrogen') !== -1) {
                    if (body.SurfaceTemperature < 250) iconName = 'WTRv3';
                    else iconName = 'WTRv8'
                } else iconName = 'WTRv7';
            }
            break;
    }

    return iconName;
}
