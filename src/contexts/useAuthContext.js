import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider"

export const useAuthContext = () => {
    const { user, setUser } = useContext(AuthContext);

    if (user === undefined) {
        throw new Error("AuthContext must be used with AuthContextProvider");
    }

    return { user, setUser };
}