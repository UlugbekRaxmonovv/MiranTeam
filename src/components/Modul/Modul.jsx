import React from 'react';
import "../../Sass/index.scss";
const Modul = ({children,btn1,maxWidth="700px",width='100%',minHeight="500px",height="100%"}) => {
    return (
        <div>
        <div  onClick={() => btn1(false)} className="overlay"></div>
        <div style={{maxWidth,width,minHeight,height}} className="modul" >
         {children}
        </div>
        </div>
    );
}

export default Modul;
