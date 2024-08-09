import React from "react";
import {Button, Icon} from "@mui/material";
import {useTranslation} from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";


type DeleteButtonProps = {
    openDialog: () => void;
};

const DeleteButton = ({ openDialog }: DeleteButtonProps) => {
    const {t} = useTranslation("buttons");
    return(
        <React.Fragment>
            <Button
                variant="contained"
                size="medium"
                title={t("delete")}
                onClick={openDialog}
                color="error"
            >
                <Icon
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <DeleteIcon/>
                </Icon>
            </Button>
        </React.Fragment>

    )
}

export default DeleteButton;