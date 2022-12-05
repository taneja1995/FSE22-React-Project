import {createUser, deleteUser} from "../services/users-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";

describe('clicking on like button updates the tuit stats', ()=>{

    const testTuit={
        tuit: "This is alex"
    }
    const user = {
        username: "alex",
        password: "alex123",
        email: "alex@abc.com"}

    //setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await createUser(user);
        await createTuit(user._id,testTuit);
        await userTogglesTuitLikes(user._id, testTuit._id);
    })

    afterAll(async() =>{
         await deleteTuit(testTuit._id);
         await deleteUser(user._id);
    })

 test('clicking on like button updates the tuit stats' , async() =>{
     const newUser= user;
     const newTuit= await createTuit(newUser._id, {
         tuit:  `Tuit created by ${newUser.username}`
     });
     await userTogglesTuitLikes(newUser._id, newTuit._id);
     const stats1= await findTuitById(testTuit._id);
     const stats2=await findTuitById(newTuit._id);
     expect(stats1.stats.likes).toEqual(stats2.stats.likes);
 })


})