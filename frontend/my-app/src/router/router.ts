import Login from "../pages/Login/Login";
import Manifest from "../pages/Manifest/Manifest";
import {ILink} from "../types/components/types";
import {faHouse, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import Main from "../pages/Main/Main";
import {faAdd} from "@fortawesome/free-solid-svg-icons/faAdd";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Logout from "../components/logout/Logout";
import WithAuth from "../components/checkauth/ChecAuth";
import Admin from "../pages/admin/Admin";
import TableRecord from "../components/admin/tables/TableRecord";
import AddRecords from "../components/admin/Records/AddRecords";

export const publicRoutes: ILink[] = [
    {name: 'Вход', to: '/login', component: Login, icon: faRightToBracket, id: 1},
    {name: 'Главная', to: '/main', component: Main, icon: faHouse, id: 2}
]

export const privateRoutes: ILink[] = [
    {name: 'Выход', to: '/logout', component: Logout, icon: faRightToBracket, id: 1},
    {name: "Мероприятия", to: '/manifest', component: WithAuth(Manifest), icon: faAdd, id: 2},
    {name: 'Главная', to: '/main', component: Main, icon: faHouse, id: 3},
    {
        name: 'Администрирование',
        to: '/admin',
        component: WithAuth(Admin),
        icon: faUser,
        id: 4,
        nestedRoutes: [{name: "Таблица", to: 'tables/:table_name', component: TableRecord, id: 5},
            {name: 'Таблица', to: 'add_record/:table_name', component: AddRecords, id: 6}]
    }
]