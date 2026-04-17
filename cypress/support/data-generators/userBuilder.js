import { faker } from '@faker-js/faker';
import staticUserData from '../../fixtures/userStaticData.json';

export function generateNewUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName()
  const email = faker.internet.email({firstName, lastName});


    return { 
        firstName,  
        lastName,
        email,
        dateOfBirth: staticUserData.dateOfBirth,
        street: staticUserData.street,
        city: staticUserData.city,
        state: staticUserData.state,
        postalCode: staticUserData.postalCode,
        country: staticUserData.country,
        phone: staticUserData.phone,
        password: staticUserData.password

    };



}