import { Knex } from "knex";
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import PromptSync from 'prompt-sync';

const generateId = () => v4();
function promptUserNumber():number
{
    let userNumber:number = 0;
    let prompt = PromptSync();
    console.log('How many users will be seeded?');
    let n:string = prompt('--> ');
    if(Number(n))
    {
        userNumber = Math.floor(Number(n));
    }
    return userNumber;
}
export async function seed(knex: Knex): Promise<void> {
    let userNumber = promptUserNumber();
    // Deletes ALL existing entries
    await knex("users").truncate();

    // Inserts seed entries
    for(let i=0;i<userNumber;i++)
    {
        await knex("users").insert([
            { 
                id: generateId(), 
                firstName: faker.name.firstName(), 
                surNames: faker.name.lastName(),
                email: faker.internet.email(), 
                password: faker.internet.password(6), 
                phone: faker.phone.phoneNumber('##############'), 
                address: faker.address.streetAddress(),
            }
        ]);
    }
};
