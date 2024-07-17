import {createContext, ReactNode, useContext, useState} from "react";

interface DrawerContextProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within the DrawerProvider');
    }
    return context;
};

export const DrawerProvider = ({ children }: { children: ReactNode}) => {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <DrawerContext.Provider value={{ open, handleDrawerOpen, handleDrawerClose }}>
            {children}
        </DrawerContext.Provider>
    )
};