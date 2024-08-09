import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { api } from "../../api/AppApi";
import CustomTable, {ColumnDefinition, RowData} from "../table/CustomTable";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {UserDto} from "../../api/user-management/response/UserDto";
import {Container, IconButton, Tooltip, Typography} from "@mui/material";
import TrueIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import {useTranslation} from "react-i18next";
import {getUserId} from "../../storage/AuthStorage";

type UsersTableProps = {
    searchValue: string;
}


const UsersTable = (props: UsersTableProps) => {

    const navigate = useNavigate();

    const {t} = useTranslation("userManagement");

    const columns: ColumnDefinition[] = [
        {id: 'firstName', label: t('firstName'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'lastName', label: t('lastName'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'email', label: t('email'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 100, sortable: true, filterable: true},
        {id: 'createdBy', label: t('createdBy'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'isBlocked', label: t('isBlocked'), type: 'TEXT', minWidth: 100, sortable: false, filterable: false},
        {id: 'action0', label: '', type: 'TEXT', minWidth: 10, sortable: false, filterable: false},
        {id: 'action1', label: '', type: 'TEXT', minWidth: 10, sortable: false, filterable: false},
        {id: 'action2', label: '', type: 'TEXT', minWidth: 10, sortable: false, filterable: false},
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

    const handleBlockUnblock = async (userId: string, isBlocked: boolean) => {
        if (isBlocked) {
            await api.userManagement.unblock(userId);
        } else {
            await api.userManagement.block(userId);
        }
    };

    const handleDelete = async (userId: string) => {
        await api.userManagement.delete(userId);
    };

    const [accessDenied, setAccessDenied] = useState<boolean>(false);


    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId) {
                    const user = await api.userManagement.get(currentUserId);
                    if (user.createdById !== "SYSTEM") {
                        setAccessDenied(true);
                        return;
                    }
                }
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
                        isBlocked: user.blocked ? <TrueIcon /> : <FalseIcon />,
                        action0: (
                            <Tooltip title={t('editUser')}>
                                <IconButton onClick={() => {
                                    navigate(`/user/edit/${user.id}`);
                                }}>
                                    <EditIcon sx={{color: '#1876D2'}} />
                                </IconButton>
                            </Tooltip>
                        ),
                        action1: (
                            <Tooltip title={user.blocked ? t('unblockUser') : t('blockUser')}>
                                <IconButton onClick={async () => {
                                    await handleBlockUnblock(user.id, user.blocked);
                                    fetchUsers();
                                }}>
                                    <BlockIcon sx={{color: '#1876D2'}} />
                                </IconButton>
                            </Tooltip>
                        ),
                        action2: (
                            <Tooltip title={t('deleteUser')} >
                                <IconButton onClick={async () => {
                                    await handleDelete(user.id);
                                    fetchUsers();
                                }}>
                                    <DeleteIcon sx={{color: '#1876D2'}}/>
                                </IconButton>
                            </Tooltip>
                        )
                    };
                    return newRow;
                }));
                setRows(userRows);
            } catch (e) {
                console.error('Error fetching user details: ', e);
            }
        };

        fetchUsers();
    }, [props.searchValue, navigate]);

    if (accessDenied) {
        return (
            <Container>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t('accessDenied')}
                </Typography>
            </Container>
        );
    }

    return (
        <CustomTable columns={columns} rows={rows} title={t('userList')} />
    );
};

export default UsersTable;