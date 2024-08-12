import { createContext, ReactNode, useContext, useEffect, useState } from "react";

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
    const [open, setOpen] = useState<boolean>(() => {
        const savedState = localStorage.getItem('drawerOpenState');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    useEffect(() => {
        localStorage.setItem('drawerOpenState', JSON.stringify(open));
    }, [open]);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <DrawerContext.Provider value={{ open, handleDrawerOpen, handleDrawerClose }}>
            {children}
        </DrawerContext.Provider>
    );
};
