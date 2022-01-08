// Script to fetch systems within N-lightyears of location:
const getSurroundingSystemsQuery = (coords, range = 10) => {
    if (!Object.keys(coords).includes('x') || !Object.keys(coords).includes('y') || !Object.keys(coords).includes('z') || Object.keys(coords).length !== 3) {
        console.error('Invalid coordinates-object provided');
        return;
    }

    const defObj = {
        "query": {
            "bool": {
                "must": []
            }
        },
        "size": 10,
        "from": 0,
        "sort": []
    }

    const minmax = c => {
        return [c - range, c + range]
    };

    for (let i in coords) {
        const [min, max] = minmax(coords[i]);

        defObj.query.bool.must.push({
            "range": {
            [`coords.${i}`]: {
                "gte": min,
                "lte": max
            }
            }
        });
    }

    return JSON.stringify(defObj, null, 2);
}

const coords = {
  x: -632.8125,
  y: -1115.78125,
  z: 3518.5
}

console.log(getSurroundingSystemsQuery(coords, 100))
