module.exports = (sequelize, dataTypes) => {
    const Pelicula = sequelize.define("Pelicula", 
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
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.FLOAT
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER
        },
        genre_id: {
            type: dataTypes.INTEGER
        }
    },
    {
        tableName: 'movies',
        timestamps: false
    });

    return Pelicula;
}