import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {api} from "../../api/AppApi";
import CustomTable, {ColumnDefinition, RowData} from "../table/CustomTable";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {UserDto} from "../../api/user-management/response/UserDto";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";

type UsersTableProps = {
    searchValue: string;
    onAction: (message: string, severity: 'success' | 'error') => void;
};

const UsersTable = ({ searchValue, onAction }: UsersTableProps) => {

    const navigate = useNavigate();
    const {t} = useTranslation("userManagement");

    const [rows, setRows] = useState<RowData[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<UserDto | null>(null);

    const columns: ColumnDefinition[] = [
        {id: 'firstName', label: t('firstName'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'lastName', label: t('lastName'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'email', label: t('email'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 100, sortable: true, filterable: true},
        {id: 'createdBy', label: t('createdBy'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'isBlocked', label: t('isBlocked'), type: 'TEXT', minWidth: 100, sortable: false, filterable: false},
        {id: 'action0', label: '', type: 'TEXT', minWidth: 10, sortable: false, filterable: false},
    ];

    const searchFormCriteria: SearchFormCriteria[] = [
        {
            fieldName: 'deletedOn',
            value: null,
            operator: CriteriaOperator.EQUALS
        }
    ];

    const searchSort: SearchSort = {
        by: 'lastName',
        order: SearchSortOrder.DSC
    };

    const searchForm: SearchForm = {
        criteria: searchFormCriteria,
        page: 1,
        size: 25,
        sort: searchSort
    };

    const fetchUsers = async () => {
        try {
            const response: SearchResponse<UserDto> = await api.userManagement.search(searchForm);
            const userRows: RowData[] = await Promise.all(response.items.map(async (user) => {
                let createdBy = 'SYSTEM';
                try {
                    if (user.firstName !== 'admin') {
                        const creator = await api.userManagement.get(user.createdById);
                        createdBy = `${creator.firstName} ${creator.lastName}`;
                    }
                } catch (e) {
                    console.error('Error fetching creator details: ', e);
                }
                const newRow: RowData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    createdOn: user.createdOn,
                    createdBy,
                    isBlocked: user.blocked ? t('yes') : t('no'),
                    action0: (
                        <div>
                        <Tooltip title={t('editUser')}>
                            <IconButton onClick={() => {
                                navigate(`/user/edit/${user.id}`);
                            }}>
                                <EditIcon sx={{color: '#1876D2'}} />
                            </IconButton>
                        </Tooltip>
                            <Tooltip title={user.blocked ? t('unblockUser') : t('blockUser')}>
                                <IconButton onClick={async () => {
                                    await handleBlockUnblock(user.id, user.blocked);
                                    await fetchUsers();
                                }}>
                                    <BlockIcon sx={{color: '#1876D2'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('deleteUser')}>
                                <IconButton onClick={() => {
                                    setUserToDelete(user);
                                    setOpenDialog(true);
                                }}>
                                    <DeleteIcon sx={{color: '#1876D2'}}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ),
                };
                return newRow;
            }));
            setRows(userRows);
        } catch (e) {
            console.error('Error fetching user details:', e);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchValue]);

    const handleBlockUnblock = async (userId: string, isBlocked: boolean) => {
        try {
            if (isBlocked) {
                await api.userManagement.unblock(userId);
                onAction(t('userUnblockedSuccess'), 'success');
            } else {
                await api.userManagement.block(userId);
                onAction(t('userBlockedSuccess'), 'success');
            }
        } catch (error) {
            onAction(t('userActionError'), 'error');
            console.error('Error blocking/unblocking user:', error);
        }
    };

    const handleDelete = async () => {
        if (userToDelete) {
            try {
                await api.userManagement.delete(userToDelete.id);
                onAction(t('userDeletedSuccess'), 'success');
                await fetchUsers();
            } catch (error) {
                onAction(t('userActionError'), 'error');
                console.error('Error deleting user:', error);
            } finally {
                setOpenDialog(false);
                setUserToDelete(null);
            }
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setUserToDelete(null);
    };

    return (
        <>
            <CustomTable columns={columns} rows={rows} title={t('userList')} />
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>{t('confirmDeleteTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('confirmDeleteMessage', { userName: `${userToDelete?.firstName} ${userToDelete?.lastName}` })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UsersTable;
