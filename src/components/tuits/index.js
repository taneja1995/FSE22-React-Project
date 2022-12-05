import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikeService from "../../services/dislike-service"

const Tuits = ({tuits = [], deleteTuit,
                   refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const dislikeTuit = (tuit) =>
        dislikeService
            .userTogglesTuitDislikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    return (
        <div>
            <ul>
                {
                    tuits.map(tuit =>
                        <Tuit key={tuit._id}
                              deleteTuit={deleteTuit}
                              likeTuit={likeTuit}
                              dislikeTuit={dislikeTuit}
                              tuit={tuit}/>)
                }
            </ul>
        </div>
    );
}

export default Tuits;