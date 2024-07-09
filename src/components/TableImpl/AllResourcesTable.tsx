import React, {useEffect, useState} from 'react';
import CustomTable, {ColumnDefinition, RowData} from "../../components/table/CustomTable";
import {api} from "../../api/AppApi";
import {ResourceDto} from "../../api/resources/response/ResourceDto";
import {SearchFormCriteria} from "../../commons/Search/SearchFormCriteria";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {SearchSort} from "../../commons/Search/SearchSort";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchResponse} from "../../commons/Search/SearchResponse";

function AllResourcesTable() {
    const columns: ColumnDefinition[] = [
        { id: 'id', label: 'Id', type: 'TEXT', minWidth: 100 },
        {id: 'name', label: 'Name', type: 'TEXT', minWidth: 100 },
        {id: 'value', label: 'Value', type: 'TEXT', minWidth: 100 },
        {id: 'date', label: 'Date', type: 'TEXT', minWidth: 100 },
        {id: 'createdBy', label: 'Created By', type: 'TEXT', minWidth: 100 },
    ];

    const searchFormCriteria: SearchFormCriteria[] = [
        {
            fieldName: 'name',
            value: 'zdjątko_zrobione_przez_EG_STUDIO',
            operator: CriteriaOperator.EQUALS
        }
    ];

    const searchSort: SearchSort = {
        by: 'name',
        order: SearchSortOrder.DSC
    };

    const searchForm: SearchForm = {
        criteria: searchFormCriteria,
        page: 1,
        size: 5,
        sort: searchSort
    };

    const [rows, setRows] = useState<RowData[]>([
        {id: 'id', value: '1', name: 'nazwa byczku'},
    ]);

    useEffect(() => {
        api.resources.search(searchForm).then((response:SearchResponse<ResourceDto>) => {
            setRows([]);
            response.items.map((responseValue) => {
                const newRow: RowData = {
                    id: responseValue.id,
                    name: responseValue.name,
                    value: responseValue.value,
                    date: responseValue.createdOn,
                    createdBy: responseValue.createdById
                }
                setRows(prevRows => [...prevRows, newRow]);
            })
        })
    }, []);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={'Resource'} />
        </div>
);
}

export default AllResourcesTable;