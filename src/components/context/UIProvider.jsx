import { createContext, useContext, useState } from "react";

export const UIContext = createContext(null);

export function useUI() {
    return useContext(UIContext);
}

export default function UIProvider({ children }) {
    const [modalIsActive, setModalIsActive] = useState(false);

    return (
        <UIContext.Provider
            value={{
                modalIsActive,
                setModalIsActive
            }}
        >
            {children}
        </UIContext.Provider>
    )

}