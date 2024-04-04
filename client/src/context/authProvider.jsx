/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    const { clearCart } = useCart();
    const [currentUser, setCurrentUser] = useState(storedUser);
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signOut = async() => {
        await axios.get('/api/auth/signout');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('signInTime');
        clearCart();
        setCurrentUser(null);        
        navigate('/');
    };
    const checkAutoSignOut = (navigate) => {
        const signInTime = localStorage.getItem('signInTime');
        if(signInTime){
          const currentTime = new Date().getTime();
          const signInDuration = 24*60*60*1000;
          if(currentTime - parseInt(signInTime) >= signInDuration){
            signOut();
            navigate('/sign-in');
          }
        }
    };
    const navigate = useNavigate();
    useEffect(() =>{
        checkAutoSignOut(navigate);
    },[]);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
          setCurrentUser(storedUser);
        }
    }, []);

    const contextValue = {
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        error,
        setError,
        signOut,
    }
    return (
        <AuthContext.Provider value={ contextValue }> 
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider ")
    }
    return context;
}