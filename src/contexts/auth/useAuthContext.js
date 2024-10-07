import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider"

export const useAuthContext = () => {
    const { user, setUser } = useContext(AuthContext);

    if (user === undefined) {
        throw new Error("useAuthContext must be used with AuthContextProvider");
    }

    return { user, setUser };
}