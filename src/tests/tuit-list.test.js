import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, findAllTuits} from "../services/tuits-service";
import axios from "axios";
import Tuits from "../components/tuits";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];
const MOCKED_TUITS =["alice's tuit", "bob's tuit"];

const TUITS = [
  {tuit:"alice's tuit", postedBy:"633fb21364b4c299cd8d298d", postedOn:Date.now(), _id:"256"}
];

test('tuit list renders static tuit array', () => {
  // TODO: implement this
  render(
      <HashRouter>
        <Tuits tuits={TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Mars rover landed and our Ingenuity helicopter took flight/i);
    expect(linkElement).toBeInTheDocument();

})

test('tuit list renders mocked', async () => {
  // TODO: implement this
    const mock=jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({ data: {tuits: TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});
