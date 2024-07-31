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
}

const AllResourcesTable = (props: AllResourcesProps) => {

    const {t} = useTranslation("overall");
    let {type} = useParams<{type: string}>();
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
                fieldName: 'id',
                value: `%${props.searchValue}%`,
                operator: CriteriaOperator.LIKE
            }
        ];
    } else {
        searchFormCriteria = [
            {
                fieldName: 'name',
                value: `%${props.searchValue}%`,
                operator: CriteriaOperator.LIKE
            },
            {
                fieldName: 'resourceType',
                value: `${props.resourceType}`,
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

    useEffect(() => {
        api.resources.search(searchForm).then((response: SearchResponse<ResourceDto>) => {
            setRows([]);
            response.items.map((responseValue) => {
                switch (responseValue.resourceType) {
                    case  'ATTACHMENT': {
                        const newRow: RowData = {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: responseValue.createdById,
                            action: <DownloadFileButton>{responseValue.value}</DownloadFileButton>
                        }
                        setRows(prevRows => [...prevRows, newRow]);
                        break;

                    }
                    case 'SECRET': {
                        const newRow: RowData = {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: responseValue.createdById,
                            action: <SecretDialog>{responseValue.id}</SecretDialog>
                        }
                        setRows(prevRows => [...prevRows, newRow]);
                        break;
                    }
                    case 'LINK': {
                        const newRow: RowData = {
                            //id: responseValue.id,
                            name: responseValue.name,
                            value:
                                <Link href={responseValue.value} underline="hover" color="inherit" rel="noreferrer"
                                      target="_blank"> {responseValue.value} </Link>,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: responseValue.createdById,
                            action: <OpenLinkButton>{responseValue.value}</OpenLinkButton>
                        }
                        setRows(prevRows => [...prevRows, newRow]);
                        break;
                    }
                    case 'TEXT': {
                        const newRow: RowData = {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: responseValue.createdById,
                            action: <ReadTextButton>{responseValue.value}</ReadTextButton>
                        }
                        setRows(prevRows => [...prevRows, newRow]);
                        break;
                    }
                    default: {
                        const newRow: RowData = {
                            id: responseValue.id,
                            name: responseValue.name,
                            value: responseValue.value,
                            type: responseValue.resourceType,
                            date: responseValue.createdOn,
                            createdBy: responseValue.createdById,
                            action: ''
                        }
                        setRows(prevRows => [...prevRows, newRow]);
                        break;

                    }
                }


            })
        })
    }, [type]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('resourcesTableTitle')} navigateTo="/project/resources/details"/>
        </div>
    );
}

export default AllResourcesTable;