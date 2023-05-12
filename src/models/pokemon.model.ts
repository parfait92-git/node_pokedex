export interface PokemonModel {
    id: number;
    name: string;
    hp: number;
    cp: number;
    picture: string;
    types: string[];
    created: Date;
}