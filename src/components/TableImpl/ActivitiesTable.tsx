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
import {useGetEnumString} from "../table/GetEnumString";
import {useParamName} from "../table/GetParamName";

type ActivitiesTableProps = {
    searchValue: string
}

const ActivitiesTable = (props: ActivitiesTableProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation("activity");
    const { getEnumString } = useGetEnumString();
    const {getParamName} = useParamName();
    const columns: ColumnDefinition[] = [
        { id: 'type', label: t('type'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdById', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: false, filterable: true },
        { id: 'params', label: t('params'), type: 'TEXT', minWidth: 250, sortable: false, filterable: false },
    ];

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
                const activityRows: RowData[] = await Promise.all(response.items.map(async (activity) => {

                    let createdBy = '';
                    const createdById = activity.createdById;
                    if (createdById === "SYSTEM") {
                        createdBy = createdById;
                    } else {
                        await api.userManagement.get(createdById).then(response => {
                            createdBy = `${response.firstName} ${response.lastName}`
                        });
                        console.log("CREATED BY ID: " + createdBy);
                    }


                    const params = activity.params.map(param => `${param.name}: ${param.value}`).join('\n');

                    const newRow: RowData = {
                        id: activity.id,
                        type: getEnumString(activity.type),
                        createdOn: activity.createdOn,
                        createdById: createdBy,
                        params: (
                            <Typography style={{ whiteSpace: 'pre-wrap' }}>
                                {params}
                            </Typography>
                        ),
                    };
                    return newRow;
                }));
                setRows(activityRows);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, [props.searchValue]);

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
