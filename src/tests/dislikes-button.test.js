import {createUser, deleteUser} from "../services/users-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";
import {userTogglesTuitDislikes} from "../services/dislike-service";

describe('clicking on dislike button updates the tuit stats', ()=>{

    let tuit;
    const user = {
        username: "bob",
        password: "bob123",
        email: "bob@abc.com"}

    //setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        createUser(user);
    })

    afterAll(async() =>{
        await userTogglesTuitDislikes(user._id, tuit._id);
        const tuits= await findTuitsByUser(user._id);
        for(const tuit of tuits){
            await deleteTuit(tuit._id);
        }
        await deleteUser(user._id);
    })

    test('clicking on dislike button updates the tuit stats' , async() =>{
        const newUser= user;
        tuit= await createTuit(newUser._id, {
            tuit:  `Tuit created by ${newUser.username}`
        });
        await userTogglesTuitDislikes(newUser._id, tuit._id);
        const stats= await findTuitById(tuit._id);
        expect(stats.stats.likes).toEqual(newUser.length);
    })


})