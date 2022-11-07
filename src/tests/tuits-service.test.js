/**
 * @jest-environment node
 */
import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('createTuit', () => {
     // sample tuit to insert
      const testTuit  ={
          tuit:"This is tuit 1."
      };
      let newTuit;
      beforeAll(()=> {
          return
      })

    afterAll(()=>{
            return deleteTuit(newTuit._id);
    })

    test('can create tuit with REST API', async ()=>{
        newTuit= await createTuit('633fb21364b4c299cd8d298d',testTuit);
       expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});


describe('deleteTuit',()=>{
   // sample tuit to delete
    const testTuit ={
        tuit: "This is tuit 2."
    };
    let newTuit;
    beforeAll(async ()=> {
        newTuit= await createTuit('6352ac2bbf252f9a7d577d41',testTuit);
        return newTuit;
    })

    afterAll(()=>{
        return deleteTuit(newTuit._id);
    })

    test('can delete tuit with REST API',async ()=>{
       const status= await deleteTuit(newTuit._id);
       expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});



describe('findTuitById', () =>{

    // sample user we want to retrieve
    const testTuit = {
        tuit:'This is test tuit 3.'
    };
    let newTuit;
    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return ;
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteTuit(newTuit._id);
    });

    test('can retrieve a tuit by their primary key with REST API', async ()=>{

        // insert the tuit in the database
        newTuit = await createTuit('6352ac2bbf252f9a7d577d41',testTuit);

        expect(newTuit.tuit).toEqual(testTuit.tuit);

        // retrieve the tuit from the database by its primary key
        const existingTuit= await findTuitById(newTuit._id);
        expect(existingTuit.tuit).toEqual(testTuit.tuit);
    });
});


describe('findAllTuits', ()=>{

    // sample tuits we'll insert to then retrieve
    const tuits=["tuit1", "tuit2", "tuit3"];
    // setup data before test
    beforeAll(async () => {
        const promise= await tuits.map(async tuit =>
        createTuit(
            "6352ac2bbf252f9a7d577d41",
            {tuit:tuit}));
        return await Promise.all(promise);
    });

    afterAll( async () =>{
        const promise = await tuits.map(async tuit => await deleteTuit(tuit._id));
        return await Promise.all(promise);
    })

    test('can retrieve all tuits with REST API', async ()=>{
       const testTuits = await findAllTuits();
       expect(testTuits.length).toBeGreaterThanOrEqual(tuits.length);

       const tuitsWeInserted= testTuits.filter(
           tuit => tuits.indexOf(tuit.tuit) >= 0);
        tuitsWeInserted.forEach(getTuit =>{
            const tuit= tuits.find(tuit => tuit === getTuit.tuit);
            expect(getTuit.tuit).toEqual(tuit);
        });
    });
});
