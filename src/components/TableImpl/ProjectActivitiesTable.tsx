import React, {useEffect, useState} from 'react';
import CustomTable, {ColumnDefinition, RowData} from "../../components/table/CustomTable";
import {api} from "../../api/AppApi";
import {ActivityDTO} from "../../api/activity/response/ActivityDto";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";

type ProjectActivitiesTableProps = {
    projectId: string;
}

const ProjectActivitiesTable = ({ projectId}: ProjectActivitiesTableProps) => {
    const { t } = useTranslation("activity");

    const columns: ColumnDefinition[] = [
        { id: 'type', label: t('type'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdById', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'params', label: t('params'), type: 'TEXT', minWidth: 250, sortable: false, filterable: false },
    ];

    const searchFormCriteria: SearchFormCriteria[] = [
        {
            fieldName: 'params.paramName',
            value: 'PROJECT_ID',
            operator: CriteriaOperator.EQUALS
        },
        {
            fieldName: 'params.paramValue',
            value: projectId,
            operator: CriteriaOperator.EQUALS
        }
    ];

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

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response: SearchResponse<ActivityDTO> = await api.activity.search(searchForm);
                const activityRows: RowData[] = await Promise.all(response.items.map(async (activity) => {
                    const params = activity.params.map(param => `${param.name}: ${param.value}`).join('\n');

                    let createdBy = '';

                    const createdById = activity.createdById;
                    console.log("CREATED BY ID: " + createdById)
                    const creator = await api.userManagement.get(createdById);
                    console.log("CREATOR: " + creator.email)
                    createdBy = `${creator.firstName} ${creator.lastName}`;
                    console.log("CREATED BY: " + createdBy);

                    const newRow: RowData = {
                        id: activity.id,
                        type: activity.type.toString(),
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
                console.error('Error fetching project activities:', error);
            }
        };

        fetchActivities();
    }, [projectId]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('projectActivitiesTableTitle')}/>
        </div>
    );
}

export default ProjectActivitiesTable;