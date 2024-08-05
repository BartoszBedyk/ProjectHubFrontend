import React, { useEffect } from 'react';

interface NoAccessHandlerProps {
    data: any | null;
}

const NoAccessHandler: React.FC<NoAccessHandlerProps> = ({ data }) => {
    useEffect(() => {
        if (data === null) {
            const handleCopy = (e: ClipboardEvent) => {
                e.preventDefault();
            };

            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault();
            };

            const handleSelectStart = (e: Event) => {
                e.preventDefault();
            };

            const handleKeyDown = (e: KeyboardEvent) => {
                if (
                    e.keyCode === 123 ||
                    (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
                    (e.ctrlKey && e.keyCode === 85)
                ) {
                    e.preventDefault();
                }
            };

            document.addEventListener('copy', handleCopy);
            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('selectstart', handleSelectStart);
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('copy', handleCopy);
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('selectstart', handleSelectStart);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [data]);

    if (data === null) {
        return (
            <div style={styles.container}>
                <h1>Sorry, nie masz dostępu do tych danych, zapytaj menagera</h1>
            </div>
        );
    }

    return <div>{data}</div>;
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif',
    },
};

export default NoAccessHandler;
