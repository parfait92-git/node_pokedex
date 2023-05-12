export default function userModel(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Cet identifiant est deja utilisé.'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}