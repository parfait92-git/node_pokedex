
// import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../services/sequilize-instance';

// class PokemonModelSql extends Model {
//     id!: number;
//     name!: string;
//     hp!: number;
//     cp!: number;
//     picture!: string;
//     types!: string[];
//     created!: Date;
// }

// PokemonModelSql.init({
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     hp: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     cp: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     picture: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     types: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// },
// {
//     sequelize,
//     modelName: 'pokemon',
//     timestamps: true,
//     createdAt: 'created',
//     updatedAt: false
//     // Autres options du modèle Sequelize
//   }
// )

const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Vol', 'Normal', 'Electrik', 'Fée', 'Insecte'];
export default function definePokemon(sequilize, DataTypes) {
    return sequilize.define('pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà utilisé'
            },
            validate: {
                notEmpty: {msg: 'Le nom ne doit pas être null'},
                notNull: {
                    msg: 'La propriété nom est réquise'
                  }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des des nombres entiers pour les points de vie.'},
                notNull: {msg: 'Les points de vie sont une propriété réquise'},
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieur ou egale à 0'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieur ou egale à 999'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
                notNull: {msg: 'Les points de dégât sont une propriété réquise'}
            },
            min: {
                args: [0],
                msg: 'Les points de dégât doivent être supérieur ou egale à 0'
            },
            max: {
                args: [99],
                msg: 'Les points de dégât doivent être inférieur ou egale à 99'
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Utilisez uniquement une URL valide.'},
                notNull: {msg: 'L\'image est une propriété réquise'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesVilid(value) {
                    if(!value) {
                        throw new Error('Un pokemon doit avoir au moins  un type');
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokemon doit avoir au plus de 3 type');
                    }
                    value.split(',').forEach(element => {
                        if(!validTypes.includes(element)) {
                            throw new Error(`Le type doit appartenir à la liste suivante: ${validTypes}`)
                        }
                    });
                }
                
            }
        }
        
    }, 
    {
        timestamps: true,
        createAt: 'created',
        updatedAt: false
    },)
}