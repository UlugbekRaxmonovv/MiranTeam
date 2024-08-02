import { Outlet } from "react-router-dom"
import SideBar from "../../components/saide-bar/SideBar"
import PropTypes from 'prop-types';
import { memo, useState } from "react";
import Modul from "../../components/Modul/Modul";

const Admin = ({ menu, setMenu }) => {
    const [modul,setModul] = useState(false);
    document.body.style.overflow =  modul ? "hidden" : "auto"
    return (
        <>
{
    modul ? 
    <Modul btn1={setModul}>


        </Modul>
        :
        <> </>

}
            <main className={`admin ${!menu ? "admin__show" : ""}`}>
                <SideBar menu={menu} setMenu={setMenu} />
                <div>
                  

                    <Outlet />
                </div>
            </main>
        </>
    )
}
Admin.propTypes = {
    menu: PropTypes.bool.isRequired,
    setMenu: PropTypes.func.isRequired,
};
export default memo(Admin);