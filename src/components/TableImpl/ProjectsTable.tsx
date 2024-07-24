import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { ProjectDTO } from "../../api/project/response/ProjectDTO";
import { SearchFormCriteria } from "../../commons/Search/SearchFormCriteria";
import { CriteriaOperator } from "../../commons/Search/CriteriaOperator";
import { SearchSort } from "../../commons/Search/SearchSort";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { SearchForm } from "../../commons/Search/SearchForm";
import { SearchResponse } from "../../commons/Search/SearchResponse";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ProjectsTableProps = {
    searchValue: string
}

const ProjectsTable = (props: ProjectsTableProps) => {
    const navigate = useNavigate();

    const columns: ColumnDefinition[] = [
        { id: 'name', label: 'Nazwa', type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'description', label: 'Opis', type: 'TEXT', minWidth: 250, sortable: true, filterable: true },
        { id: 'createdOn', label: 'Data stworzenia', type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: 'Stworzony przez', type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'action', label: '', type: 'TEXT', minWidth: 150, sortable: false, filterable: false },
    ];

    const searchFormCriteria: SearchFormCriteria[] = [
        {
            fieldName: 'name',
            value: `%${props.searchValue}%`,
            operator: CriteriaOperator.LIKE
        }
    ];

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

    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response: SearchResponse<ProjectDTO> = await api.project.search(searchForm);
                const projectRows: RowData[] = await Promise.all(response.items.map(async (project) => {
                    let createdBy = 'Unknown';
                    try {
                        const creator = await api.projectMember.getByIds(project.createdById, project.id);
                        createdBy = `${creator.firstName} ${creator.lastName}`;
                    } catch (error) {
                        console.error('Error fetching creator details:', error);
                    }
                    const newRow: RowData = {
                        name: project.name,
                        description: project.description,
                        createdOn: project.createdOn,
                        createdBy,
                        action: (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/project/${project.id}`)}
                            >
                                Szczegóły projektu
                            </Button>
                        )
                    };
                    return newRow;
                }));
                setRows(projectRows);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, [props.searchValue, navigate]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={'Lista projektów'} />
        </div>
    );
}

export default ProjectsTable;