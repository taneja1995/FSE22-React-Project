import {createUser, deleteUser} from "../services/users-service";
import {findAllTuitsLikedByUser, userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";

describe('user can fetch likes', ()=>{

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
        userTogglesTuitLikes(user._id, testTuit._id);
    })

    afterAll(async() =>{
        const tuit= await findTuitsByUser(user._id);
        await deleteTuit(tuit._id);
        await deleteUser(user._id);
    })

    test('user can fetch likes' , async() => {
        const newUser = user;
        const tuitLikedByUser = await findAllTuitsLikedByUser(newUser._id);
       expect(tuitLikedByUser.tuit).toEqual(testTuit.tuit);
       expect(tuitLikedByUser.postedBy).toEqual(testTuit.postedBy);
    })
})