import { useContext } from "react";
import AppContext from "../context/AppContext";

const useAuth = () => {
    return useContext(AppContext);
}

export default useAuth; 