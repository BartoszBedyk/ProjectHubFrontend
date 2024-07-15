import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Icon} from "@mui/material";
import {Close, CopyAll, VisibilityOutlined} from "@mui/icons-material";
import {api} from "../../api/AppApi";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";



interface SecretProps {
    children : string;
}


const SecretDialog: React.FC<SecretProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [secret, setSecret] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(secret)
        handleClose();

    };

    const searchFormCriteria: SearchFormCriteria[] = [
        {
            fieldName: 'id',
            value: children,
            operator: CriteriaOperator.EQUALS
        }
    ];

    const searchSort: SearchSort = {
        by: 'id',
        order: SearchSortOrder.DSC
    };

    const searchForm: SearchForm = {
        criteria: searchFormCriteria,
        page: 1,
        size: 1,
        sort: searchSort
    };
    api.resources.readSecret(searchForm).then((response: string)=>
    {
        setSecret(response);
    });

    return (
        <React.Fragment>
            <Button  variant="contained"
                     size="medium"
                     onClick={handleClickOpen}
            >

                <Icon
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <VisibilityOutlined></VisibilityOutlined>
                </Icon>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-secret-title"
                aria-describedby="secret-dialog-description"
            >
                <DialogTitle id="dialog-secret-title">
                    {"Secret unmasked"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="secret-dialog-description">
                        {secret}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <Icon>
                            <Close></Close>
                        </Icon>
                    </Button>
                    <Button onClick={handleCopy}>
                        <Icon>
                            <CopyAll></CopyAll>
                        </Icon>
                    </Button>

                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}

export default SecretDialog;