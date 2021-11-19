const calculateDistance = (a: Coordinates, b: Coordinates): number => {
    const distance = Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2) + Math.pow((b.z - a.z), 2));

    return parseFloat(distance.toFixed(2));
}

export default calculateDistance;
