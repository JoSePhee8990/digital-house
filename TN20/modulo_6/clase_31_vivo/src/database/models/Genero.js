module.exports = (sequelize, dataTypes) => {
    const Genero = sequelize.define("Genero", 
    {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        },
        active: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'genres',
        timestamps: false
    });

    return Genero;
}