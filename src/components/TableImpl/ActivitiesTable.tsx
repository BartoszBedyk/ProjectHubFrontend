import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { ActivityDTO } from "../../api/activity/response/ActivityDto";
import { SearchFormCriteria } from "../../commons/Search/SearchFormCriteria";
import { SearchSort } from "../../commons/Search/SearchSort";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { SearchForm } from "../../commons/Search/SearchForm";
import { SearchResponse } from "../../commons/Search/SearchResponse";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserId } from "../../storage/AuthStorage";
import {Container, Typography} from "@mui/material";
import {ActivityTypeDto} from "../../api/activity/response/ActivityTypeDto";

type ActivitiesTableProps = {
    searchValue: string
}

const ActivitiesTable = (props: ActivitiesTableProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation("activity");

    const columns: ColumnDefinition[] = [
        { id: 'type', label: t('type'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdById', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'params', label: t('params'), type: 'TEXT', minWidth: 250, sortable: false, filterable: false },
    ];

    function getEnumString(type: ActivityTypeDto): string {
        switch (type) {
            case ActivityTypeDto.CREATE_USER:
                return t('enum.createUser');
            case ActivityTypeDto.USER_LOG_IN_SUCCESS:
                return t('enum.userLogInSuccess');
            case ActivityTypeDto.USER_LOG_IN_FAILED:
                return t('enum.userLogInFailed');
            case ActivityTypeDto.USER_LOG_OUT:
                return t('enum.userLogOut');
            case ActivityTypeDto.DELETE_USER:
                return t('enum.deleteUser');
            case ActivityTypeDto.DOCUMENT_OPEN:
                return t('enum.documentOpen');
            case ActivityTypeDto.KEY_OPEN:
                return t('enum.keyOpen');
            case ActivityTypeDto.DOCUMENT_DOWNLOAD:
                return t('enum.documentDownload');
            case ActivityTypeDto.CREATE_PROJECT_MEMBER:
                return t('enum.createProjectMember');
            case ActivityTypeDto.UPDATE_PROJECT_MEMBER:
                return t('enum.updateProjectMember');
            case ActivityTypeDto.DELETE_PROJECT_MEMBER:
                return t('enum.deleteProjectMember');
            case ActivityTypeDto.CREATE_PROJECT_ENVIRONMENT:
                return t('enum.createProjectEnvironment');
            case ActivityTypeDto.UPDATE_PROJECT_ENVIRONMENT:
                return t('enum.updateProjectEnvironment');
            case ActivityTypeDto.DELETE_PROJECT_ENVIRONMENT:
                return t('enum.deleteProjectEnvironment');
            case ActivityTypeDto.UPDATE_PROJECT:
                return t('enum.updateProject');
            case ActivityTypeDto.CREATE_RESOURCE:
                return t('enum.createResource');
            case ActivityTypeDto.UPDATE_RESOURCE:
                return t('enum.updateResource');
            case ActivityTypeDto.DELETE_RESOURCE:
                return t('enum.deleteResource');
            default:
                return 'Unknown enum type';
        }
    }

    const searchFormCriteria: SearchFormCriteria[] = [];

    const searchSort: SearchSort = {
        by: 'createdOn',
        order: SearchSortOrder.DSC
    };

    const searchForm: SearchForm = {
        criteria: searchFormCriteria,
        page: 1,
        size: 10000,
        sort: searchSort
    };

    const [rows, setRows] = useState<RowData[]>([]);
    const [accessDenied, setAccessDenied] = useState<boolean>(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId) {
                    const user = await api.userManagement.get(currentUserId);
                    if (user.createdById !== "SYSTEM") {
                        setAccessDenied(true);
                        return;
                    }
                }

                const response: SearchResponse<ActivityDTO> = await api.activity.search(searchForm);
                const activityRows: RowData[] = response.items.map((activity) => {
                    const params = activity.params.map(param => `${param.name}: ${param.value}`).join('\n');

                    const newRow: RowData = {
                        id: activity.id,
                        type: getEnumString(activity.type),
                        createdOn: activity.createdOn,
                        createdById: activity.createdById,
                        params: (
                            <Typography style={{ whiteSpace: 'pre-wrap' }}>
                                {params}
                            </Typography>
                        ),
                    };
                    return newRow;
                });
                setRows(activityRows);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
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
        <div>
            <CustomTable columns={columns} rows={rows} title={t('activitiesTableTitle')}/>
        </div>
    );
}

export default ActivitiesTable;
