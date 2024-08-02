import React from 'react';
import "../../Sass/index.scss"
const Edit = ({detail}) => {

    return (
       <div className="edit">
        <div className="edit_form">
            {/* <form action="" >
                <div className="company">
                <div className="companiy__">
                         <label htmlFor="">Company</label>
                         <input type="text"  value={data?.company} 
                        onChange={(e) => setEdit(prev =>({...prev, company: e.target.value }))} />
                    </div>

                    <div className="companiy__">
                         <label htmlFor="">Truck</label>
                         <input type="text" value={data?.update_vehicle} 
                        onChange={(e) => setEdit(prev =>({...prev, update_vehicle: e.target.value }))} />
                    </div>

                    <div className="companiy__">
                         <label htmlFor="">Driver</label>
                         <input type="text"  value={data?.update_driver} 
                        onChange={(e) => setEdit(prev =>({...prev, update_driver: e.target.value }))}/>
                    </div>
                </div>
                <div className="tex">
                    <label htmlFor="">Issue</label> <br />
                <textarea value={data?.update_issue} name="" id="" cols="30" rows="10"></textarea>
                </div>
               
                <div className="btn_rows">
                    <p>{data?.created_at}</p>
             <div className="l">
             <div className="btn_alls">
                        <button disabled={isLoading}>{isLoading ? 'loading' : 'Done'}</button>
                    </div>
                    <div className="btn_allsw">
                        <button  onClick={() => setEdit(null)}>Close</button>
                    </div>
             </div>
                </div>
            </form> */}
        </div>
       </div>
    );
}

export default Edit;
