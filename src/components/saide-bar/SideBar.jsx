import { Link, NavLink} from 'react-router-dom';
import "../../Sass/index.scss";
import { MdCreateNewFolder, MdWarehouse } from "react-icons/md";
import { FiHome } from "react-icons/fi";
// import { AiFillCodeSandboxSquare } from "react-icons/ai";
import PropTypes from 'prop-types';
// import { CgProfile } from 'react-icons/cg';
import { useGetProfileQuery } from '../../context/api/adminApi';
import { FiEdit } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { memo, useContext, useState } from 'react';
import logo from '../../assets/imgs/logo.jpg'
import { VscChevronDown } from "react-icons/vsc";
import { RiAdminLine } from "react-icons/ri";
import { VscChevronUp } from "react-icons/vsc";
import { RxComponentInstance } from "react-icons/rx";
import { Context } from '../DarckMore/Context';

const SideBar = ({ menu, setMenu }) => {
    const { theme } = useContext(Context);
    const { data } = useGetProfileQuery()
    let name = (data?.innerData?.user?.fname);

    const [settings,setSettings] = useState(false)
    return (
        <>
          <div className={`said ${theme ? "light" : ""}`}>
          <div
                onClick={() => setMenu(true)}
                className={`side-bar__overly-base ${menu ? "side-bar__overly-show" : "side-bar__overly "}`}
            ></div>
            <section className={`side-bar ${!menu ? "side-bar-show" : ""}`}>

                <nav>
                    <Link
                        to="/admin/customer"
                        className={`side-bar__logo ${!menu ? "side-bar__logo-show" : ""}`}
                    >
                        <div className={`side-bar__logo-box ${ !menu ? "logo" : ""}`}>
                            <img src={logo} alt=""  />
                            <h1>{name?.split("").slice(0, 1).join("")}</h1>
                        </div>
                        <h1 className="side-bar__logo-title">{name}</h1>
                    </Link>
                    <ul className="side-bar__list">
                        <li className="side-bar__item">
                            <NavLink

                                to="/admin/customer"
                                className={`side-bar__link ${!menu ? "side-bar__link-show" : ""}`}
                            >
                                <div>
                                    <FiHome />
                                </div>
                                <p onClick={() => setMenu(!false)}>   Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="side-bar__item">
                            <NavLink

                                to="/admin/warehouse"
                                className={`side-bar__link ${!menu ? "side-bar__link-show" : ""}`}
                            >
                                <div >
                                    <FiEdit />
                                </div>
                                <p onClick={() => setMenu(!false)}>   Updates</p>
                            </NavLink>
                        </li>
                        <li className="side-bar__item">
                            <NavLink
                                className={`side-bar__linkss ${!menu ? "side-bar__link-show" : ""}`}
                            >
                                <div>
                                    <CiSettings   onClick={() =>setSettings(!settings)} className='settings' />
                                </div>
                                <p onClick={() =>setSettings(!settings)}>   Settings</p>
                               {
                                settings ? <VscChevronUp onClick={() =>setSettings(!settings)}  />  
                                :  <VscChevronDown  onClick={() =>setSettings(!settings)} />
                                
                               }
                            </NavLink>

                           <div className={`hammasi ${settings ? "settings_show" : ""}`}>
                           <NavLink  to="/admin/vendor"  className="side-bar__links">
                          
                           <div>
                                <RxComponentInstance  className={`svg ${!menu ? "svg1" : ""}`}/>
                            </div>
                                <p className={`p ${ !menu ? "p1" : ""}`} onClick={() => setMenu(!false)}> Admins</p>
                            </NavLink>

                            <NavLink  to="/admin/registor"  className={`side-bar__links ${!menu ? "side-bar__link-show" : ""}`}>
                            <div>
                                <RiAdminLine className={`svg ${!menu ? "svg1" : ""}`} />
                            </div>
                                <p className={`p ${ !menu ? "p1" : ""}`} onClick={() => setMenu(!false)} >    Company</p>
                            </NavLink>
                           </div>

                        </li>
    </ul>
                </nav>
            </section>
          </div>
        </>
    );
}

SideBar.propTypes = {
    menu: PropTypes.bool.isRequired,
    setMenu: PropTypes.func.isRequired,
}

export default memo(SideBar);
