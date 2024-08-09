import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { ProjectDTO } from "../../api/project/response/ProjectDTO";
import { SearchFormCriteria } from "../../commons/Search/SearchFormCriteria";
import { CriteriaOperator } from "../../commons/Search/CriteriaOperator";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { SearchForm } from "../../commons/Search/SearchForm";
import { SearchResponse } from "../../commons/Search/SearchResponse";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserId } from "../../storage/AuthStorage";

type ProjectsTableProps = {
    searchValue: string
}

const ProjectsTable = (props: ProjectsTableProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation("projects");

    const columns: ColumnDefinition[] = [
        { id: 'name', label: t('name'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'description', label: t('description'), type: 'TEXT', minWidth: 250, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: t('createdById'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
    ];

    const [rows, setRows] = useState<RowData[]>([]);
    const [searchForm, setSearchForm] = useState<SearchForm>({
        criteria: [],
        page: 1,
        size: 50,
        sort: {
            by: 'name',
            order: SearchSortOrder.DSC
        }
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId) {
                    const user = await api.userManagement.get(currentUserId);
                    const criteria: SearchFormCriteria[] = [
                        {
                            fieldName: 'name',
                            value: `%${props.searchValue}%`,
                            operator: CriteriaOperator.LIKE
                        }
                    ];

                    if (user.createdById !== 'SYSTEM') {
                        criteria.push(
                            { fieldName: "members.userId", value: currentUserId, operator: CriteriaOperator.EQUALS },
                            { fieldName: "deletedOn", value: null, operator: CriteriaOperator.EQUALS },
                            { fieldName: "deletedById", value: null, operator: CriteriaOperator.EQUALS }
                        );
                    }

                    setSearchForm({
                        ...searchForm,
                        criteria
                    });

                    const response: SearchResponse<ProjectDTO> = await api.project.search({
                        ...searchForm,
                        criteria
                    });

                    const projectRows: RowData[] = await Promise.all(response.items.map(async (project) => {
                        let createdBy = t('unknown');
                        try {
                            const creator = await api.userManagement.get(project.createdById);
                            createdBy = `${creator.firstName} ${creator.lastName}`;
                        } catch (error) {
                            console.error('Error fetching creator details:', error);
                        }

                        const projectName = project.deletedOn ? `${project.name} {t('deleted)}` : project.name;

                        const newRow: RowData = {
                            id: project.id,
                            name: projectName,
                            description: project.description,
                            createdOn: project.createdOn,
                            createdBy,
                        };
                        return newRow;
                    }));

                    setRows(projectRows);
                }
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
