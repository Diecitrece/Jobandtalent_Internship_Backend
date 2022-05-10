import { Knex } from 'knex';
import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import PromptSync from 'prompt-sync';
import { passwordCrypt } from '../../password_crypt';
import { User } from '@core/domain/user.model';

const generateId = () => v4();
function promptUserNumber(): number {
  let userNumber = 0;
  const prompt = PromptSync();
  console.log('How many users will be seeded?');
  const n: string = prompt('--> ');
  if (Number(n)) {
    userNumber = Math.floor(Number(n));
  }
  return userNumber;
}
export async function seed(knex: Knex): Promise<void> {
  const userNumber: number = promptUserNumber();
  // Deletes ALL existing entries
  await knex('users').truncate();

  // Inserts seed entries
  const generateUser = async (userNumber: number) => {
    if (userNumber === 0) {
      return;
    }
    const user: User = {
      id: generateId(),
      firstName: faker.name.firstName(),
      surNames: faker.name.lastName(),
      email: faker.internet.email(),
      password: await passwordCrypt().password_crypt(
        faker.internet.password(6)
      ),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      role: 'USER',
    };
    await knex('users').insert(user);
    await generateUser(userNumber - 1);
  };

  await generateUser(userNumber);
}
