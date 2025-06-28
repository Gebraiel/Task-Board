"use client"

import { getFullUser } from "../services/client/users";

const { createContext, useState, useContext } = require("react")

const fullUser = await getFullUser();
const UserContext = createContext({});

export default function UserContextProvider({children}){
    const [user] = useState({"user":fullUser});
    return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
}

export function useUser(){
    const context = useContext(UserContext);
    const {user} = context;
    return user;
}