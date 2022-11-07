/**
 * @jest-environment jsdom
 */
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {deleteUsersByUsername, findAllUsers} from "../services/users-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {createUser} from "./services";

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]


test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  const linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
});

describe('createUser', () => {
  // sample user to insert
  const ripley = {
    username: 'ishita',
    password: '1234',
    email: 'ishi@abc.com'
  }


test('user list renders async', async () => {
  await createUser(ripley);
  const users = await findAllUsers();
  render(
      <HashRouter>
        <UserList users={users}/>
      </HashRouter>);
  const linkElement = screen.getByText(/ishita/i);
  expect(linkElement).toBeInTheDocument();
});
});

  test('user list renders mocked', async () => {
    const mock=jest.spyOn(axios, 'get');
   mock.mockImplementation(() =>
        Promise.resolve({ data: {users: MOCKED_USERS} }));
    const response = await findAllUsers();
    const users = response.users;

    render(
        <HashRouter>
          <UserList users={users}/>
        </HashRouter>);

    const user = screen.getByText(/ellen_ripley/i);
    expect(user).toBeInTheDocument();
  });


