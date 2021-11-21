const mapRowToTemplate = (templateName, row) => {
    const templates = {
        "systems": row => ({
            name: row.name,
            id: row.id,
            id64: row.id64,
            coordinates: row.coords || {x: null, y: null, z: null},
            estimatedCoordinates: row.estimatedCoordinates || {x: null, y: null, z: null, precision: null},
            created_at: new Date(row.date).toISOString(),
            updated_at: new Date(row.date).toISOString()
        }),
        "systems-update": row => ({
            name: row.name,
            id: row.id,
            id64: row.id64,
            coordinates: row.coords || {x: null, y: null, z: null},
            estimatedCoordinates: row.estimatedCoordinates || {x: null, y: null, z: null, precision: null},
            updated_at: new Date(row.date).toISOString()
        })
    }

    return templates[templateName](row);
}

module.exports = mapRowToTemplate;
