import Tuits from "../tuits";

import {useEffect, useState} from "react";
import * as service from "../../services/dislike-service";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, [setDislikedTuits]);

    return(
        <div>
            <Tuits tuits={dislikedTuits}
                   refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;