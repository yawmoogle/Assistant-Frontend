import { useContext } from "react"
import { AlertContext } from "./AlertContextProvider"

export const useAlertContext = () => {
    const { alert, setAlert } = useContext(AlertContext);

    if (alert === undefined) {
        throw new Error('useAlertContext must be used with AlertContextProvider');
    }

    return { alert, setAlert };
}