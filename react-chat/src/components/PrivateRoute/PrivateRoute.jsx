import {Navigate} from "react-router-dom";
import {AppRoutes} from "../../utils/types/AppRoutes.js";
import {useAuthStore} from "../../utils/store/tokensStore.js";


export function PrivateRoute({children}){
    const {accessToken} = useAuthStore()
    if (!accessToken){
        return <Navigate to={AppRoutes.Login}/>
    }
    return children;
}