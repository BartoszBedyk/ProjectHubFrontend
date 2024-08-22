import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { SearchSort } from "../../commons/Search/SearchSort";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { SearchForm } from "../../commons/Search/SearchForm";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { CriteriaOperator } from "../../commons/Search/CriteriaOperator";
import {ResourceDto, ResourceType} from "../../api/resources/response/ResourceDto";
import { ActivityTypeDto } from "../../api/activity/response/ActivityTypeDto";
import {useGetEnumString} from "../table/GetEnumString";

type ResourcesActivitiesTableProps = {
    projectId: string;
    environmentId: string;
    resourceType?: ResourceType;
}

const ResourcesActivitiesTable = ({ projectId, environmentId, resourceType }: ResourcesActivitiesTableProps) => {
    const { t } = useTranslation("activity");
    const { getEnumString } = useGetEnumString();
    const columns: ColumnDefinition[] = [
        { id: 'type', label: t('type'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdById', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'params', label: t('params'), type: 'TEXT', minWidth: 250, sortable: false, filterable: false },
    ];

    const searchSort: SearchSort = {
        by: 'createdOn',
        order: SearchSortOrder.DSC
    };

    const [rows, setRows] = useState<RowData[]>([]);
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const activityTypes: ActivityTypeDto[] = [
                    ActivityTypeDto.CREATE_RESOURCE,
                    ActivityTypeDto.UPDATE_RESOURCE,
                    ActivityTypeDto.DELETE_RESOURCE,
                    ActivityTypeDto.KEY_OPEN,
                    ActivityTypeDto.DOCUMENT_DOWNLOAD,
                    ActivityTypeDto.DOCUMENT_OPEN,
                ];

                const fetchActivitiesByType = async (type: ActivityTypeDto) => {
                    const searchForm: SearchForm = {
                        criteria: [
                            {
                                fieldName: 'type',
                                value: type,
                                operator: CriteriaOperator.EQUALS
                            }
                        ],
                        page: 1,
                        size: 10000,
                        sort: searchSort
                    };

                    const response = await api.activity.search(searchForm);
                    return response.items;
                };

                const allActivities = await Promise.all(activityTypes.map(fetchActivitiesByType));
                const mergedActivities = allActivities.flat();

                const activityRows = await Promise.all(mergedActivities.map(async (activity) => {
                    const params = activity.params.map(param => `${param.name}: ${param.value}`).join('\n');

                    let resourceId: string | undefined;
                     if (activity.type === ActivityTypeDto.KEY_OPEN) {
                        resourceId = activity.params.find(param => param.name === 'KEY_ID')?.value;
                    } else {
                        resourceId = activity.params.find(param => param.name === 'RESOURCE_ID')?.value;
                    }

                    if (resourceId) {
                        const resource: ResourceDto | null = await api.resources.get(resourceId);
                        if (resource && resource.environmentId === environmentId && (!resourceType || resource.resourceType === resourceType)) {
                            return {
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
                        }
                    }
                    return null;
                }));

                setRows(activityRows.filter(row => row !== null) as RowData[]);
            } catch (error) {
                console.error('Error fetching resource activities:', error);
            }
        };

        fetchActivities();
    }, [projectId, environmentId, resourceType]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('resourcesActivitiesTableTitle')} />
        </div>
    );
}

export default ResourcesActivitiesTable;
