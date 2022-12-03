import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = () =>
        service.findTuitsByUser("me")
            .then(tuits => setTuits(tuits));
    useEffect(findMyTuits, []);
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits);
    return(
        <Tuits tuits={tuits}
<<<<<<< HEAD
               deleteTuit={deleteTuit} refreshTuits={findMyTuits()}/>
=======
               deleteTuit={deleteTuit}
               refreshTuits={findMyTuits}/>
>>>>>>> 9cb3d61ab069a66cd1e00044c76fc4d199275bbc
    );
};

export default MyTuits;