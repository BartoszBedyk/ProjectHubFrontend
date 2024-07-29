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
import {useTranslation} from "react-i18next";

type ProjectsTableProps = {
    searchValue: string
}

const ProjectsTable = (props: ProjectsTableProps) => {
    const navigate = useNavigate();
    const {t} = useTranslation("projects")

    const columns: ColumnDefinition[] = [
        { id: 'name', label: t('name'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'description', label: t('description'), type: 'TEXT', minWidth: 250, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
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
                    let createdBy = t('unknown');
                    try {
                        const creator = await api.projectMember.getByIds(project.createdById, project.id);
                        createdBy = `${creator.firstName} ${creator.lastName}`;
                    } catch (error) {
                        console.error('Error fetching creator details:', error);
                    }
                    const newRow: RowData = {
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        createdOn: project.createdOn,
                        createdBy,
                        action: (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/project/${project.id}`)}
                                title={t('open')}
                            >
                                {t('projectDetails')}
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
            <CustomTable columns={columns} rows={rows} title={t('projectsTableTitle')} navigateTo={'/project'} />
        </div>
    );
}

export default ProjectsTable;