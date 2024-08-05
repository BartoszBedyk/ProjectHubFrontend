import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { ProjectEnvironmentDto } from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import { useTranslation } from "react-i18next";
import { api } from "../../api/AppApi";
import TrueIcon from "@mui/icons-material/Check";
import FalseIcon from "@mui/icons-material/Close";

type ProjectEnvironmentsTableProps = {
    projectId: string;
};

const ProjectEnvironmentsTable = ({ projectId }: ProjectEnvironmentsTableProps) => {
    const { t } = useTranslation('environments');
    const columns: ColumnDefinition[] = [
        { id: 'name', label: t('name'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'isEncrypted', label: t('isEncrypted'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: t('createdBy'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'updatedOn', label: t('updatedOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
    ];

    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchProjectEnvironments = async () => {
            try {
                const response = await api.projectEnvironment.findAll(projectId);
                const projectEnvironmentRows = await Promise.all(response.map(async (env: ProjectEnvironmentDto) => {
                    let createdBy = 'Unknown';
                    if (env.createdById === 'SYSTEM') {
                        createdBy = 'System';
                    } else {
                        const creator = await api.userManagement.get(env.createdById);
                        createdBy = `${creator.firstName} ${creator.lastName}`;
                    }
                    const newRow: RowData = {
                        id: env.id,
                        name: env.name,
                        isEncrypted: env.encrypted ? <TrueIcon /> : <FalseIcon />,
                        createdOn: env.createdOn,
                        createdBy,
                        updatedOn: env.updatedOn ? env.updatedOn : 'N/A',
                    };
                    return newRow;
                }));
                setRows(projectEnvironmentRows);
            } catch (error) {
                console.error('Error fetching project environments:', error);
            }
        };

        fetchProjectEnvironments();
    }, [projectId]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('environmentsList')} navigateTo={`/project-environment`} />
        </div>
    );
};

export default ProjectEnvironmentsTable;
