export default function getSystemCoordinates(system: System): Coordinates {
    return {
        x: system.StarPosX,
        y: system.StarPosY,
        z: system.StarPosZ,
    }
}
