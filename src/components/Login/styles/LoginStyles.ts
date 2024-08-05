import {grey} from "@mui/material/colors";

export const stylesLogin = {

    cardContainer: {
        display: "flex",
        border: "none",
        boxShadow: "0 1px 20px 0 rgba(69, 90, 100, .08);",
        marginBottom: "10%"
    },

    formContainer: {
        fontSize: "20px",
        height: "auto",
        margin: "16px",
        marginTop: "0px",
        padding: "5%"
    },

    textFields: {
        fontSize: "40px",
        height: "auto",
        width: "auto",
        margin: "16px",
        padding: "0px",
        backgroundColor: grey[100]
    },

    lockIconProps: {
        size: "10px 10px",
        marginBottom: "10px",
        width: "40px",
        height: "auto",
        alt: "Lock",
    },
    buttonProps: {
        alignSelf: "center",
        fontSize: "inherit",
        height: "inherit",
        margin: "inherit",
        padding: "inherit",
        width: "50%"
    },
    errorProps: {
        fontSize: "14px",
        color: "red",
        alignSelf: "center",
        marginLeft: "16px",
        paddingBottom: "0",
    }


};