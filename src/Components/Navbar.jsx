import { useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
    const pathName = window.location.pathname.replace(/[^A-Za-z0-9]/g, "");
    const allTabs = ["Single", "Multiple"];
    const [position, setPosition] = useState(allTabs.includes(pathName) ? pathName : "/"); //default => /
    const cssNavLink = id => position === id ? "text-white" : "text-black";

    return (
        <nav className="flex bg-gray-600 items-center justify-center gap-8 h-14 text-xl font-bold border-b-2 border-solid border-white">
            <NavLink to={"/"} onClick={() => setPosition("/")} className={cssNavLink("/")}>About</NavLink>
            <NavLink to={"/Multiple"}  onClick={() => setPosition("Multiple")} className={cssNavLink("Multiple")}>Multiple Files</NavLink>
            <NavLink to={"/Single"}  onClick={() => setPosition("Single")} className={cssNavLink("Single")}>Single File</NavLink>
        </nav>
    );
};

export default Navbar;