import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import {useTranslation} from "react-i18next";

type ProjectMembersTableProps = {
    projectId: string;
};

const ProjectMembersTable = ({ projectId }: ProjectMembersTableProps) => {
    const {t} = useTranslation('members');
    const columns: ColumnDefinition[] = [
        { id: 'firstName', label: 'Imię', type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'lastName', label: 'Nazwisko', type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: 'Data stworzenia', type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: 'Stworzony przez', type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'role', label: 'Rola', type: 'ENUM', minWidth: 150, sortable: true, filterable: true, enumValues: ['OWNER', 'MAINTAINER', 'VISITOR'] },
    ];

    const [rows, setRows] = useState<RowData[]>([]);

    useEffect(() => {
        const fetchProjectMembers = async () => {
            try {
                const response = await api.projectMember.getByProjectId(projectId);
                    const projectMemberRows = await Promise.all(response.map(async (member: ProjectMemberDto) => {
                        let createdBy = 'Unknown';
                        const creator = await api.userManagement.get(member.createdById);
                        createdBy = `${creator.firstName} ${creator.lastName}`;
                        const newRow: RowData = {
                            id: member.userId,
                            projectId: member.projectId,
                            firstName: member.firstName,
                            lastName: member.lastName,
                            createdOn: member.createdOn.toString(),
                            createdBy,
                            role: member.role,
                        };
                        return newRow;
                    }));
                    setRows(projectMemberRows);
            } catch (error) {
                console.error('Error fetching project members:', error);
            }
        };

        fetchProjectMembers();
    }, [projectId]);

    return (
        <div>
            <CustomTable columns={columns} rows={rows} title={t('membersList')} navigateTo={`/project-member/${projectId}`}/>
        </div>
    );
};

export default ProjectMembersTable;