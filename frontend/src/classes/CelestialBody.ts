import {StarType} from '../@types/StarType.d';
import {PlanetType} from '../@types/PlanetType.d';
import {
    AtmosphereProperty,
    AtmosphereType
} from '../@types/Atmosphere.d';
import {
    Star,
    Planet
} from '../../vendor/EDSM/@types/CelestialBodies.d';

class CelestialBody {
    body: Star|Planet;
    bodyId: number;
    iconName: string;
    children: Array<CelestialBody> = [];

    constructor(body: Star|Planet) {
        this.body = body;
        this.bodyId = body.bodyId;

        if (this.isStar) {
            this.setStarIcon();
        } else {
            this.setPlanetIcon();
        }
    }

    get isStar() {
        return this.body.type === 'Star';
    }

    get isTerraformable() {
        return (<Planet>this.body).terraformingState !== 'Not terraformable';
    }

    get isLandable() {
        return (<Planet>this.body).isLandable;
    }

    get isTidallyLocked() {
        return this.body.rotationalPeriodTidallyLocked;
    }

    get hasAtmosphere() {
        return (<Planet>this.body).atmosphereType !== 'No atmosphere';
    }

    get atmosphereProperty() {
        const atmosphereType = (<Planet>this.body).atmosphereType.toLowerCase();

        let atmosphereProperty = AtmosphereProperty.None;

        if (/-rich/.test(atmosphereType))   atmosphereProperty |= AtmosphereProperty.Rich;
        if (/thick/.test(atmosphereType))   atmosphereProperty |= AtmosphereProperty.Thick;
        if (/thin/.test(atmosphereType))    atmosphereProperty |= AtmosphereProperty.Thin;
        if (/hot/.test(atmosphereType))     atmosphereProperty |= AtmosphereProperty.Hot;

        return atmosphereProperty;
    }

    get parents() {
        return Object.assign({}, ...(this.body.parents || []));
    }

    addChild(child: CelestialBody) {
        this.children.push(child);
    }

    hasAtmosphereProperty(property: number) {
        return !!((this.atmosphereProperty & property) !== 0);
    }

    hasAtmosphereType(type: string) {
        const atmosphereType = (<Planet>this.body).atmosphereType.toLowerCase();

        return new RegExp(type).test(atmosphereType);
    }

    atmosphereCompositionContains(chemical: string) {
        return Object.keys((<Planet>this.body).atmosphereComposition).map(c => c.toLowerCase()).includes(chemical.toLowerCase());
    }

    setStarIcon() {
        const starType = (<Star>this.body).subType;
        const stellarMass = (<Star>this.body).solarMasses;
        const surfaceTemp = (<Star>this.body).surfaceTemperature;

        let iconName = '';

        // Main sequence
        if (starType === StarType.O) {
            iconName = 'O';
        } else if (starType === StarType.B) {
            iconName = 'B';
        } else if (starType === StarType.A) {
            iconName = 'A';
        } else if (starType === StarType.F) {
            iconName = 'F';
        } else if (starType === StarType.G) {
            iconName = 'G';
        } else if (starType === StarType.K) {
            iconName = 'K';
        } else if (starType === StarType.M) {
            iconName = 'M';
        } else if (starType === StarType.L) {
            iconName = 'L';
        } else if (starType === StarType.T) {
            iconName = 'T';
        } else if (starType === StarType.Y) {
            iconName = 'Y';
        }

        // Black holes
        if (starType === StarType.H) {
            if (stellarMass < 7.0) {
                iconName = 'H_stellar';
            } else if (stellarMass < 70.0) {
                iconName = 'H';
            } else {
                iconName = 'H_intermediate';
            }
        }

        if (starType === StarType.SuperMassiveBlackHole) {
            iconName = 'SuperMassiveBlackHole';
        }

        // Neutron stars
        if (starType === StarType.N) {
            if (stellarMass < 1.1) {
                iconName = 'N';
            } else if (stellarMass < 1.9) {
                iconName = 'N_massive';
            } else {
                iconName = 'N_veryMassive';
            }
        }

        // White dwarfs
        if ([StarType.WD, StarType.WDA, StarType.WDAB, StarType.WDAO, StarType.WDAZ, StarType.WDAV, StarType.WDB, StarType.WDBZ, StarType.WDBV, StarType.WDO, StarType.WDOV, StarType.WDQ, StarType.WDC, StarType.WDCV, StarType.WDX].includes(starType)) {
            if (surfaceTemp <= 5500) {
                iconName = 'D';
            } else if (surfaceTemp < 8000) {
                iconName = 'D_hot';
            } else if (surfaceTemp < 14000) {
                iconName = 'D_veryHot';
            } else {
                iconName = 'D_extremelyHot';
            }
        }

        // Carbon stars
        if ([StarType.C, StarType.CHD, StarType.CJ, StarType.CN, StarType.CS].includes(starType)) {
            iconName = 'C';
        }

        // Herbig AeBe stars
        if (starType === StarType.AeBe) {
            if (surfaceTemp < 5000) {
                iconName = 'A';
            } else {
                iconName = 'B';
            }
        }

        // Giants and supergiants
        if (starType === StarType.A_SuperGiant) {
            iconName = 'A';
        } else if (starType === StarType.B_SuperGiant) {
            iconName = 'B';
        } else if (starType === StarType.F_SuperGiant) {
            iconName = 'F';
        } else if (starType === StarType.G_SuperGiant) {
            iconName = 'G';
        } else if (starType === StarType.K_Giant) {
            iconName = 'K';
        } else if (starType === StarType.M_Giant || starType === StarType.M_SuperGiant) {
            iconName = 'M';
        }

        // T-Tauri stars
        if (starType === StarType.TTS) {
            if (surfaceTemp < 3700) {
                iconName = 'M';
            } else if (surfaceTemp < 5200) {
                iconName = 'K';
            } else if (surfaceTemp < 6000) {
                iconName = 'G';
            } else if (surfaceTemp < 7500) {
                iconName = 'F';
            } else if (surfaceTemp < 10000) {
                iconName = 'A';
            } else if (surfaceTemp < 30000) {
                iconName = 'B';
            } else {
                iconName = 'O';
            }
        }

        // Wolf-Rayet stars
        if ([StarType.W, StarType.WC, StarType.WN, StarType.WNC, StarType.WO].includes(starType)) {
            if (surfaceTemp < 50000) {
                iconName = 'F';
            } else if (surfaceTemp < 90000) {
                iconName = 'A';
            } else if (surfaceTemp < 140000) {
                iconName = 'B';
            } else {
                iconName = 'O';
            }
        }

        if (starType === StarType.MS || starType === StarType.S) {
            iconName = 'M';
        }

        if (starType === StarType.Nebula) {
            iconName = 'Nebula';
        }

        if (starType === StarType.StellarRemnantNebula) {
            iconName = 'StellarRemnantNebula';
        }

        if (starType === StarType.X || starType === StarType.RoguePlanet) {
            iconName = 'Unknown';
        }

        if (iconName === '') {
            console.log(starType);
            iconName = 'Unknown';
        }

        this.iconName = iconName;
    }

    setPlanetIcon() {
        const planetType = (<Planet>this.body).subType;
        const stellarMass = (<Planet>this.body).earthMasses;
        const surfaceTemp = (<Planet>this.body).surfaceTemperature;

        let iconName = '';

        // Giants
        if ([PlanetType.WG, PlanetType.WGWL, PlanetType.GGWB, PlanetType.GGAB, PlanetType.C1GG, PlanetType.C2GG, PlanetType.C3GG, PlanetType.C4GG, PlanetType.C5GG, PlanetType.HRGG, PlanetType.HGG].includes(planetType)) {
            iconName = 'GG1v1'; // fallback

            if (planetType === PlanetType.GGAB) {
                if (surfaceTemp < 105) {
                    iconName = 'GGAv8';
                } else if (surfaceTemp < 110) {
                    iconName = 'GGAv11';
                } else if (surfaceTemp < 115) {
                    iconName = 'GGAv9';
                } else if (surfaceTemp < 120) {
                    iconName = 'GGAv2';
                } else if (surfaceTemp < 124) {
                    iconName = 'GGAv12';
                } else if (surfaceTemp < 128) {
                    iconName = 'GGAv14';
                } else if (surfaceTemp < 130) {
                    iconName = 'GGAv7';
                } else if (surfaceTemp < 134) {
                    iconName = 'GGAv13';
                } else if (surfaceTemp < 138) {
                    iconName = 'GGAv6';
                } else if (surfaceTemp < 142) {
                    iconName = 'GGAv1';
                } else if (surfaceTemp < 148) {
                    iconName = 'GGAv3';
                } else if (surfaceTemp < 152) {
                    iconName = 'GGAv5';
                } else {
                    iconName = 'GGAv4';
                }
            }

            if (planetType === PlanetType.WGWL || planetType === PlanetType.GGWB) {
                if (surfaceTemp < 152) {
                    iconName = 'GGWv24';
                } else if (surfaceTemp < 155) {
                    if (this.atmosphereCompositionContains('oxygen')) {
                        iconName = 'GGWv1';
                    } else {
                        iconName = 'GGWv16'
                    }
                } else if (surfaceTemp < 158) {
                    iconName = 'GGWv3';
                } else if (surfaceTemp < 160) {
                    iconName = 'GGWv14';
                } else if (surfaceTemp < 162) {
                    iconName = 'GGWv22';
                } else if (surfaceTemp < 165) {
                    iconName = 'GGWv20';
                } else if (surfaceTemp < 172) {
                    iconName = 'GGWv25';
                } else if (surfaceTemp < 175) {
                    iconName = 'GGWv2';
                } else if (surfaceTemp < 180) {
                    iconName = 'GGWv13';
                } else if (surfaceTemp < 185) {
                    iconName = 'GGWv9';
                } else if (surfaceTemp < 190) {
                    iconName = 'GGWv21';
                } else if (surfaceTemp < 200) {
                    iconName = 'GGWv7';
                } else if (surfaceTemp < 205) {
                    iconName = 'GGWv8';
                } else if (surfaceTemp < 210) {
                    iconName = 'GGWv15';
                } else if (surfaceTemp < 213) {
                    iconName = 'GGWv17';
                } else if (surfaceTemp < 216) {
                    iconName = 'GGWv6';
                } else if (surfaceTemp < 219) {
                    iconName = 'GGWv18';
                } else if (surfaceTemp < 222) {
                    iconName = 'GGWv10';
                } else if (surfaceTemp < 225) {
                    iconName = 'GGWv11';
                } else if (surfaceTemp < 228) {
                    iconName = 'GGWv23';
                } else if (surfaceTemp < 232) {
                    iconName = 'GGWv5';
                } else if (surfaceTemp < 236) {
                    iconName = 'GGWv12';
                } else {
                    if (this.atmosphereCompositionContains('oxygen')) {
                        iconName = 'GGWv19';
                    } else {
                        iconName = 'GGWv4';
                    }
                }
            }

            if (planetType === PlanetType.HGG || planetType === PlanetType.HRGG) {
                if (surfaceTemp < 110) {
                    if (this.atmosphereCompositionContains('antimony') || this.atmosphereCompositionContains('cadmium') || this.atmosphereCompositionContains('niobium')) {
                        iconName = 'GGHv7';
                    } else {
                        iconName = 'GGHv3';
                    }
                } else if (surfaceTemp < 125) {
                    iconName = 'GGHv6';
                } else if (surfaceTemp < 140) {
                    iconName = 'GGHv2';
                } else if (surfaceTemp < 180) {
                    iconName = 'GGHv5';
                } else if (surfaceTemp < 270) {
                    iconName = 'GGHv4';
                } else if (surfaceTemp < 600) {
                    iconName = 'GGHv1';
                } else if (surfaceTemp < 700) {
                    iconName = 'GGHv9';
                } else {
                    iconName = 'GGHv8';
                }
            }

            if (planetType === PlanetType.C1GG) {
                if (surfaceTemp <= 30) {
                    iconName = 'GG1v12';
                } else if (surfaceTemp < 35) {
                    iconName = 'GG1v15';
                } else if (surfaceTemp < 40) {
                    iconName = 'GG1v13';
                } else if (surfaceTemp < 45) {
                    iconName = 'GG1v4'; // neptune
                } else if (surfaceTemp < 50) {
                    iconName = 'GG1v9';
                } else if (surfaceTemp < 55) {
                    iconName = 'GG1v2';
                } else if (surfaceTemp < 60) {
                    iconName = 'GG1v16'; // uranus
                } else if (surfaceTemp < 65) {
                    iconName = 'GG1v19';
                } else if (surfaceTemp < 70) {
                    iconName = 'GG1v18';
                } else if (surfaceTemp < 78) {
                    iconName = 'GG1v11';
                } else if (surfaceTemp < 85) {
                    iconName = 'GG1v3';
                } else if (surfaceTemp < 90) {
                    iconName = 'GG1v6';
                } else if (surfaceTemp < 100) {
                    iconName = 'GG1v8';
                } else if (surfaceTemp < 110) {
                    iconName = 'GG1v1';
                } else if (surfaceTemp < 130) {
                    iconName = 'GG1v5';
                } else if (surfaceTemp < 135) {
                    iconName = 'GG1v17';
                } else if (surfaceTemp < 140) {
                    iconName = 'GG1v20';
                } else if (surfaceTemp < 150) {
                    iconName = 'GG1v14'; // jupiter
                } else if (surfaceTemp < 170) {
                    iconName = 'GG1v7';
                } else {
                    iconName = 'GG1v10';
                }
            }

            if (planetType === PlanetType.C2GG) {
                if (surfaceTemp < 160) {
                    iconName = 'GG2v4';
                } else if (surfaceTemp < 175) {
                    iconName = 'GG2v7';
                } else if (surfaceTemp < 200) {
                    iconName = 'GG2v5';
                } else if (surfaceTemp < 2450) {
                    iconName = 'GG2v8';
                } else if (surfaceTemp < 260) {
                    iconName = 'GG2v6';
                } else if (surfaceTemp < 275) {
                    iconName = 'GG2v1';
                } else if (surfaceTemp < 300) {
                    iconName = 'GG2v2';
                } else {
                    iconName = 'GG2v3';
                }
            }

            if (planetType === PlanetType.C3GG) {
                if (surfaceTemp < 300) {
                    iconName = 'GG3v2';
                } else if (surfaceTemp < 340) {
                    iconName = 'GG3v3';
                } else if (surfaceTemp < 370) {
                    iconName = 'GG3v12';
                } else if (surfaceTemp < 400) {
                    iconName = 'GG3v1';
                } else if (surfaceTemp < 500) {
                    iconName = 'GG3v5';
                } else if (surfaceTemp < 570) {
                    iconName = 'GG3v4';
                } else if (surfaceTemp < 600) {
                    iconName = 'GG3v8';
                } else if (surfaceTemp < 620) {
                    iconName = 'GG3v10';
                } else if (surfaceTemp < 660) {
                    iconName = 'GG3v7';
                } else if (surfaceTemp < 700) {
                    iconName = 'GG3v9';
                } else if (surfaceTemp < 742) {
                    iconName = 'GG3v11';
                } else if (surfaceTemp < 760) {
                    iconName = 'GG3v13';
                } else {
                    iconName = 'GG3v6';
                }
            }

            if (planetType === PlanetType.C4GG) {
                if (surfaceTemp < 810) {
                    iconName = 'GG4v9';
                } else if (surfaceTemp < 830) {
                    iconName = 'GG4v6';
                } else if (surfaceTemp < 880) {
                    iconName = 'GG4v4';
                } else if (surfaceTemp < 950) {
                    iconName = 'GG4v10';
                } else if (surfaceTemp < 1010) {
                    iconName = 'GG4v3';
                } else if (surfaceTemp < 1070) {
                    iconName = 'GG4v1';
                } else if (surfaceTemp < 1125) {
                    iconName = 'GG4v7';
                } else if (surfaceTemp < 1200) {
                    iconName = 'GG4v2';
                } else if (surfaceTemp < 1220) {
                    iconName = 'GG4v13';
                } else if (surfaceTemp < 1240) {
                    iconName = 'GG4v11';
                } else if (surfaceTemp < 1270) {
                    iconName = 'GG4v8';
                } else if (surfaceTemp < 1300) {
                    iconName = 'GG4v12';
                } else {
                    iconName = 'GG4v5';
                }
            }

            if (planetType === PlanetType.C5GG) {
                if (surfaceTemp < 1600) {
                    iconName = 'GG5v3';
                } else if (surfaceTemp < 1620) {
                    iconName = 'GG5v4';
                } else if (surfaceTemp < 1700) {
                    iconName = 'GG5v1';
                } else if (surfaceTemp < 1850) {
                    iconName = 'GG5v2';
                } else {
                    iconName = 'GG5v5';
                }
            }

            if (planetType === PlanetType.WG) {
                if (surfaceTemp < 155) {
                    iconName = 'WTGv6';
                } else if (surfaceTemp < 160) {
                    iconName = 'WTGv2';
                } else if (surfaceTemp < 165) {
                    iconName = 'WTGv1';
                } else if (surfaceTemp < 170) {
                    iconName = 'WTGv3';
                } else if (surfaceTemp < 180) {
                    iconName = 'WTGv4';
                } else if (surfaceTemp < 190) {
                    iconName = 'WTGv5';
                } else {
                    iconName = 'WTGv7';
                }
            }
        }

        // Terrestrial planets
        if (planetType === PlanetType.AW) {
            iconName = 'AMWv1'; // fallback

            if (this.isTerraformable) {
                iconName = 'AMWv2';
            } else if (this.atmosphereProperty === AtmosphereProperty.Thick || this.atmosphereProperty === AtmosphereProperty.Hot) {
                iconName = 'AMWv3';
            } else if (this.atmosphereProperty === AtmosphereProperty.Rich) {
                iconName = 'AMWv4';
            } else if (this.isLandable || (!this.hasAtmosphere && surfaceTemp < 140)) {
                iconName = 'AMWv5';
            } else if (surfaceTemp < 190) {
                iconName = 'AMWv6';
            } else if (surfaceTemp < 200) {
                iconName = 'AMWv3';
            } else if (surfaceTemp < 210) {
                iconName = 'AMWv1';
            } else {
                iconName = 'AMWv4';
            }
        }

        if (planetType === PlanetType.ELW) {
            iconName = 'ELWv5'; // fallback

            if (stellarMass.toPrecision(1) === '1' && surfaceTemp === 288) { // Earth
                iconName = 'ELWv1';
            } else {
                if (this.isTidallyLocked) {
                    iconName = 'ELWv7';
                } else {
                    if (stellarMass < 0.15 && surfaceTemp < 262) { // Mars-like
                        iconName = 'ELWv4';
                    } else if (surfaceTemp < 270) {
                        iconName = 'ELWv8';
                    } else if (surfaceTemp < 285) {
                        iconName = 'ELWv2';
                    } else if (surfaceTemp < 300) {
                        iconName = 'ELWv3';
                    } else {
                        iconName = 'ELWv5';
                    }
                }
            }
        }

        if (planetType === PlanetType.HMCW) {
            iconName = 'HMCv3'; // fallback

            if (this.isLandable || !this.hasAtmosphere) {
                if (surfaceTemp < 300) {
                    if (this.isTidallyLocked) {
                        iconName = 'HMCv30';
                    } else {
                        iconName = 'HMCv27';
                    }
                } else if (surfaceTemp < 500) {
                    iconName = 'HMCv34';
                } else if (surfaceTemp < 700) {
                    iconName = 'HMCv32';
                } else if (surfaceTemp < 900) {
                    iconName = 'HMCv31';
                } else if (surfaceTemp < 1000) {
                    if (this.isTidallyLocked) {
                        iconName = 'HMCv33';
                    } else {
                        iconName = 'HMCv35';
                    }
                } else if (surfaceTemp >= 1000) {
                    iconName = 'HMCv36';
                }
            } else if (!this.isLandable) {
                if (this.hasAtmosphereType(AtmosphereType.Ammonia)) {
                    if (this.isTidallyLocked) {
                        iconName = 'HMCv29';
                    } else {
                        iconName = 'HMCv17';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Argon)) {
                    iconName = 'HMCv26';
                } else if (this.hasAtmosphereType(AtmosphereType.CarbonDioxide)) {
                    if (surfaceTemp < 220) {
                        iconName = 'HMCv9';
                    } else if (surfaceTemp < 250) {
                        iconName = 'HMCv12';
                    } else if (surfaceTemp < 285) {
                        iconName = 'HMCv6';
                    } else if (surfaceTemp < 350) {
                        iconName = 'HMCv28';
                    } else if (surfaceTemp < 400) {
                        if (this.isTidallyLocked) {
                            iconName = 'HMCv7';
                        } else {
                            iconName = 'HMCv8';
                        }
                    } else if (surfaceTemp < 600) {
                        if (this.isTidallyLocked) {
                            iconName = 'HMCv1';
                        } else {
                            iconName = 'HMCv24';
                        }
                    } else if (surfaceTemp < 700) {
                        iconName = 'HMCv3';
                    } else if (surfaceTemp < 900) {
                        iconName = 'HMCv25';
                    } else if (surfaceTemp > 1250) {
                        iconName = 'HMCv14';
                    } else {
                        iconName = 'HMCv18';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Methane)) {
                    if (this.isTidallyLocked) {
                        iconName = 'HMCv19';
                    } else {
                        iconName = 'HMCv11';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Nitrogen)) {
                    if (surfaceTemp < 200) {
                        iconName = 'HMCv2';
                    } else {
                        iconName = 'HMCv5';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.SulphurDioxide)) {
                    if (surfaceTemp < 700) {
                        iconName = 'HMCv23';
                    } else {
                        iconName = 'HMCv37';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Water)) {
                    if (surfaceTemp < 400) {
                        iconName = 'HMCv4';
                    } else if (surfaceTemp < 700) {
                        iconName = 'HMCv13';
                    } else if (surfaceTemp < 1000) {
                        iconName = 'HMCv16';
                    } else {
                        iconName = 'HMCv20';
                    }
                } else {
                    iconName = 'HMCv3';
                }
            } else {
                iconName = 'HMCv3';
            }

        }

        if (planetType === PlanetType.IB) {
            iconName = 'ICYv4';

            if (this.isLandable) {
                iconName = 'ICYv7';
            } else {
                if (this.hasAtmosphereType(AtmosphereType.Helium)) {
                    iconName = 'ICYv10';
                } else if (this.hasAtmosphereType(AtmosphereType.Neon) || this.atmosphereCompositionContains('neon')) {
                    if (surfaceTemp < 55) {
                        iconName = 'ICYv6';
                    } else {
                        iconName = 'ICYv9';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Argon)) {
                    if (surfaceTemp < 100) {
                        iconName = 'ICYv1';
                    } else {
                        iconName = 'ICYv5';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Nitrogen)) {
                    if (surfaceTemp < 105) {
                        iconName = 'ICYv2';
                    } else if (surfaceTemp < 150) {
                        iconName = 'ICYv3';
                    } else {
                        iconName = 'ICYv4';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Methane)) {
                    if (this.isTidallyLocked) {
                        iconName = 'ICYv3';
                    } else {
                        iconName = 'ICYv8';
                    }
                } else {
                    iconName = 'ICYv5';
                }
            }
        }

        if (planetType === PlanetType.MRB) {
            iconName = 'MRBv1'; // fallback

            if (this.isLandable) {
                if (surfaceTemp < 1000) {
                    iconName = 'MRBv7';
                } else if (surfaceTemp < 1200) {
                    iconName = 'MRBv2';
                } else if (surfaceTemp < 2000) {
                    iconName = 'MRBv12';
                } else {
                    iconName = 'MRBv8';
                }
            } else {
                if (surfaceTemp < 1600) {
                    iconName = 'MRBv9';
                } else if (surfaceTemp < 1800) {
                    iconName = 'MRBv3';
                } else if (surfaceTemp < 1900) {
                    iconName = 'MRBv4';
                } else if (surfaceTemp < 2000) {
                    iconName = 'MRBv10';
                } else if (surfaceTemp < 2200) {
                    iconName = 'MRBv11';
                } else if (surfaceTemp < 2400) {
                    iconName = 'MRBv14';
                } else if (surfaceTemp < 2600) {
                    iconName = 'MRBv8';
                } else if (surfaceTemp < 3500) {
                    iconName = 'MRBv13';
                } else if (surfaceTemp < 5000) {
                    iconName = 'MRBv1';
                } else if (surfaceTemp < 6000) {
                    iconName = 'MRBv5';
                } else {
                    iconName = 'MRBv6';
                }
            }
        }

        if (planetType === PlanetType.RB) {
            iconName = 'RBDv1'; // fallback

            if (surfaceTemp === 55 && !this.isLandable) { // pluto
                iconName = 'RBDv6';
            } else if (surfaceTemp < 150) {
                iconName = 'RBDv2';
            } else if (surfaceTemp < 300) {
                iconName = 'RBDv1';
            } else if (surfaceTemp < 400) {
                iconName = 'RBDv3';
            } else if (surfaceTemp < 500) {
                iconName = 'RBDv4';
            } else {
                iconName = 'RBDv5';
            }
        }

        if (planetType === PlanetType.RIW) {
            iconName = 'RIBv1'; // fallback

            if (surfaceTemp < 50) {
                iconName = 'RIBv1';
            } else if (surfaceTemp < 150) {
                iconName = 'RIBv2';
            } else {
                iconName = 'RIBv4';
            }

            if (this.isTidallyLocked) {
                iconName = 'RIBv3';
            } else {
                if (this.hasAtmosphereProperty((AtmosphereProperty.Thick | AtmosphereProperty.Rich))) {
                    iconName = 'RIBv4';
                } else if (this.hasAtmosphereProperty((AtmosphereProperty.Hot | AtmosphereProperty.Thin))) {
                    iconName = 'RIBv1';
                }
            }
        }

        if (planetType === PlanetType.WW) {
            iconName = 'WTRv7'; // fallback

            if (!this.hasAtmosphere) {
                iconName = 'WTRv10';
            } else {
                if (this.hasAtmosphereType(AtmosphereType.CarbonDioxide)) {
                    if (surfaceTemp < 260) {
                        iconName = 'WTRv6';
                    } else if (surfaceTemp < 280) {
                        iconName = 'WTRv5';
                    } else if (surfaceTemp < 300) {
                        iconName = 'WTRv7';
                    } else if (surfaceTemp < 400) {
                        iconName = 'WTRv2';
                    } else {
                        iconName = 'WTRv11';
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Ammonia)) {
                    if (this.isTidallyLocked) {
                        iconName = 'WTRv12';
                    } else {
                        if (surfaceTemp < 275) {
                            iconName = 'WTRv1';
                        } else if (surfaceTemp < 350) {
                            iconName = 'WTRv13';
                        } else if (surfaceTemp < 380) {
                            iconName = 'WTRv9';
                        } else {
                            iconName = 'WTRv4';
                        }
                    }
                } else if (this.hasAtmosphereType(AtmosphereType.Nitrogen)) {
                    if (surfaceTemp < 250) {
                        iconName = 'WTRv3';
                    } else {
                        iconName = 'WTRv8'
                    }
                } else {
                    iconName = 'WTRv7';
                }
            }
        }

        this.iconName = iconName;
    }
}

export default CelestialBody;
