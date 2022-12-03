import React from "react";

const TuitStats = ({tuit, likeTuit}) =>  {
    return (
      <div className="row mt-2">
          <div className="col">
        <span onClick={() => likeTuit(tuit)}>
        {
            tuit.stats.likes > 0 &&
            <i className="fas fa-heart me-1"
               style={{color: 'red'}}></i>
        }
            {
                tuit.stats.likes <= 0 &&
                <i className="far fa-heart"></i>
            }
            {tuit.stats && tuit.stats.likes}
        </span>
          </div>
      </div>
    );
  }
export default TuitStats
