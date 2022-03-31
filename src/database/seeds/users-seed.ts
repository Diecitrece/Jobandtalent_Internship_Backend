import { Knex } from "knex";
import { v4 } from 'uuid';

const generateId = () => v4();

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { 
            id: generateId(), 
            firstName: 'usuarioDePrueba', 
            surNames: 'Uno', 
            email: 'uno@prueba.test', 
            password: '4321', 
            phone: '43214321432143', 
            address: 'Dirección del usuario de prueba Uno' 
        },
        { 
            id: generateId(), 
            firstName: 'usuarioDePrueba', 
            surNames: 'Dos', 
            email: 'dos@prueba.test', 
            password: '5432', 
            phone: '54325432543254', 
            address: 'Dirección del usuario de prueba Dos' 
        },
        { 
            id: generateId(), 
            firstName: 'usuarioDePrueba', 
            surNames: 'Tres', 
            email: 'tres@prueba.test', 
            password: '6543', 
            phone: '65436543654365', 
            address: 'Dirección del usuario de prueba Tres' 
        },
        { 
            id: generateId(), 
            firstName: 'usuarioDePrueba', 
            surNames: 'Cuatro', 
            email: 'cuatro@prueba.test', 
            password: '7654', 
            phone: '76547654765476', 
            address: 'Dirección del usuario de prueba Cuatro' 
        },
    ]);
};
