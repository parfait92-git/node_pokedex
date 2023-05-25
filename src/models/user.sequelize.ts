export default function userModel(sequelize, DataTypes) {
    return sequelize.define('userDb', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Cet identifiant est deja utilisé.'
            },
            validate: {
                notEmpty: {msg: 'Le nom d\'utilisateur ne doit pas être null'},
                notNull: {
                    msg: 'La propriété nom d\'utilisateur est réquise'
                  }
            }
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être null'},
                notNull: {
                    msg: 'La nom est réquise'
                  }
            }
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le prénom ne doit pas être null'},
                notNull: {
                    msg: 'La propriété prénom  est réquise'
                  }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le mail ne doit pas être null'},
                notNull: {
                    msg: 'La propriété mail est réquise'
                  },
                  isEmail: { msg: 'Le format de l\'e-mail est invalide' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'Le mot de passe ne doit pas être null'},
                notNull: {
                    msg: 'La propriété mot de passe est réquise'
                  }
            }
            ,
            min: {
                args: [6],
                msg: 'Le mot de passe doit être supérieur ou egale à 6 caractères'
            },
            max: {
                args: [24],
                msg: 'Le mot de passe doit être inférieur ou egale à 24 caractères'
            }
        }
    })
}