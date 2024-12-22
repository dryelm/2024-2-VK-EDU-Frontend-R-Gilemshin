import {Navigate} from "react-router-dom";
import {AccessTokenKey} from "../../api/utils/ApiHelper.js";
import {AppRoutes} from "../../utils/types/AppRoutes.js";


export function PrivateRoute({children}){
    if (!localStorage.getItem(AccessTokenKey)){
        return <Navigate to={AppRoutes.Login}/>
    }
    return children;
}