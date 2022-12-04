import {createUser, deleteUser} from "../services/users-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";
import {findAllTuitsDislikedByUser, userTogglesTuitDislikes} from "../services/dislike-service";

describe('user can fetch dislikes', ()=>{

    const testTuit={
        tuit: "hey this is my first tuit"
    }
    const user = {
        username: "alex",
        password: "alex123",
        email: "alex@abc.com"}

    //setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        createUser(user);
        createTuit(user._id, testTuit);
        userTogglesTuitDislikes(user._id, testTuit._id);
    })

    afterAll(async() =>{
        const tuit= await findTuitsByUser(user._id);
        await deleteTuit(tuit._id);
        await deleteUser(user._id);
    })

    test('user can fetch dislikes' , async() => {
        const newUser = user;
        const tuitDislikedByUser = await findAllTuitsDislikedByUser(newUser._id);
        expect(tuitDislikedByUser.tuit).toEqual(testTuit.tuit);
        expect(tuitDislikedByUser.postedBy).toEqual(testTuit.postedBy);
    })
})