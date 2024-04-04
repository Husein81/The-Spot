import { useState } from "react";
import Nav from "./Nav"
import { RiMenu2Line } from "react-icons/ri";
import Logo from "../Logo";

// eslint-disable-next-line react/prop-types
export default function Layout({children}){
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-bgGray h-screen ">
      <div className=" md:hidden flex items-center  p-4">
      <button 
      onClick={() => setToggle(!toggle)}
      className="text-2xl">
        <RiMenu2Line/>
      </button>
      <div className="flex grow justify-center mr-8">
      <Logo/>
      </div>
    </div>
    <div className="flex">
      <Nav show={toggle}/>
      <div className=" flex-grow p-4 h-screen">
        {children}
      </div>
    </div>
    </div>
  );
}
