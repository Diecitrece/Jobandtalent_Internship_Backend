import { returnUserMapping } from "./user.routes";
test("Pass a user to this function, and then it returns it without password", () => {
  const user = {
    id: "iduser",
    firstName: "Panceta",
    surNames: "Pancetapellido",
    email: "panceta@gmail.com",
    password: "panceta123",
    phone: "elnúmerodelapanceta",
    address: "calledelapanceta puerta 1 1ºC",
  };
  const result = returnUserMapping(user);
  const expected = {
    id: user.id,
    firstName: user.firstName,
    surNames: user.surNames,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
  expect(result).toStrictEqual(expected);
});
