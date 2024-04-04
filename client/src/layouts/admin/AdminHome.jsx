import { useState } from "react";
import Layout from "../../components/AdminComponents/Layout"
import { useAuth } from "../../context/authProvider";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const { currentUser, signOut } = useAuth();
  const [isPopup, setIsPopup] = useState(false);
  const toggel = () => {
    setIsPopup(!isPopup);
  }
  const handleSignOut = () =>{
    signOut();
    setIsPopup(false);
}
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>{currentUser.rest.username}</h2>
        <div className="flex bg-gray-300 gap-1 text-slate-700 rounded-full overflow-hidden">
        <img 
        onClick={toggel}
        src={currentUser.rest.avatar}
        className="h-10 w-10 cursor-pointer"/>
        {isPopup && (
          <div className="flex flex-col absolute top-16 right-10 bg-slate-100  border border-gray-300 rounded shadow px-4 p-2 text-gray-400">
                <span className="py-1 px-2 cursor-pointer">
                  {currentUser.rest.username}
                </span>
                <Link 
                to={'/sign-in'} 
                onClick={handleSignOut}
                className="hover:underline"
                >Sign out
                </Link>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
}
export default AdminHome;