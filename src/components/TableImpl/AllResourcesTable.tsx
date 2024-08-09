import React, {useEffect, useState} from 'react';
import CustomTable, {ColumnDefinition, RowData} from "../../components/table/CustomTable";
import {api} from "../../api/AppApi";
import {ResourceDto, ResourceType} from "../../api/resources/response/ResourceDto";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";
import {Link} from "@mui/material";
import {DownloadFileButton} from "./DownloadFileButton";
import SecretDialog from "./SecretDialog";
import OpenLinkButton from "./OpenLinkButton";
import ReadTextButton from "./ReadTextButton";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

type AllResourcesProps = {
    searchValue: string,
    resourceType?: ResourceType
    environmentId: string
}

const AllResourcesTable = (props: AllResourcesProps) => {
    const {t} = useTranslation("overall");
    let {type} = useParams<{ type: string }>();
    const columns: ColumnDefinition[] = [
        //{ id: 'id', label: 'Id', type: 'TEXT', minWidth: 50},
        {id: 'name', label: t('forms.name'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'value', label: t('forms.value'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'date', label: t('forms.creationDate'), type: 'DATE', minWidth: 50, sortable: true, filterable: true},
        {id: 'type', label: t('forms.type'), type: 'TEXT', minWidth: 50, sortable: true, filterable: true},
        {id: 'createdBy', label: t('forms.createdBy'), type: 'TEXT', minWidth: 100, sortable: true, filterable: true},
        {id: 'action', label: '', type: 'TEXT', minWidth: 100, sortable: false, filterable: false},
    ];

    let searchFormCriteria: SearchFormCriteria[]
    if (!props.resourceType) {
        searchFormCriteria = [
            {
                fieldName: 'deletedOn',
                value: null,
                operator: CriteriaOperator.EQUALS
            },
            {
                fieldName: 'projectId',
                value: props.searchValue,
                operator: CriteriaOperator.EQUALS
            },
            {
                fieldName: 'environmentId',
                value: props.environmentId,
                operator: CriteriaOperator.EQUALS
            }

        ];
    } else {
        searchFormCriteria = [
            {
                fieldName: 'deletedOn',
                value: null,
                operator: CriteriaOperator.EQUALS
            },
            {
                fieldName: 'projectId',
                value: props.searchValue,
                operator: CriteriaOperator.EQUALS
            },
            {
                fieldName: 'resourceType',
                value: props.resourceType,
                operator: CriteriaOperator.EQUALS
            },
            {
                fieldName: 'environmentId',
                value: props.environmentId,
                operator: CriteriaOperator.EQUALS
            }

        ];
    }

    const searchSort: SearchSort = {
        by: 'name',
        order: SearchSortOrder.DSC
    };

    const searchForm: SearchForm = {
        criteria: searchFormCriteria,
        page: 1,
        size: 50,
        sort: searchSort
    };

    const [rows, setRows] = useState<RowData[]>([
        {id: 'id', value: '1', name: 'nazwa byczku'},
    ]);
    const link: string = `/project/${props.searchValue}/resources/details`;

    useEffect(() => {
        api.resources.search(searchForm).then(async (response: SearchResponse<ResourceDto>) => {
            const newRows = await Promise.all(response.items.map(async (responseValue) => {
                let userData = await api.userManagement.get(responseValue.createdById)
                    .then(response => `${response.firstName} ${response.lastName}`);

                switch (responseValue.resourceType) {
                    case 'ATTACHMENT':
                        return {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: userData,
                            action: <DownloadFileButton>{responseValue.value}</DownloadFileButton>
                        };
                    case 'SECRET':
                        return {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: userData,
                            action: <SecretDialog>{responseValue.id}</SecretDialog>
                        };
                    case 'LINK':
                        return {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: (
                                <Link href={responseValue.value} underline="hover" color="inherit" rel="noreferrer"
                                      target="_blank">{responseValue.value}</Link>
                            ),
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: userData,
                            action: <OpenLinkButton>{responseValue.value}</OpenLinkButton>
                        };
                    case 'TEXT':
                        return {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: userData,
                            action: <ReadTextButton>{responseValue.value}</ReadTextButton>
                        };
                    default:
                        return {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: userData,
                            action: ''
                        };
                }
            }));
            setRows(newRows);
        });
    }, [type, props.searchValue, props.environmentId]);


    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('resources.resourcesTableTitle')} navigateTo={link}/>
        </div>
    );
}

export default AllResourcesTable;