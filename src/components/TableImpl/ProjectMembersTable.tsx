import React, { useEffect, useState } from 'react';
import CustomTable, { ColumnDefinition, RowData } from "../../components/table/CustomTable";
import { api } from "../../api/AppApi";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import {useTranslation} from "react-i18next";
import {Role} from "../../api/project/project-member/response/Role";

type ProjectMembersTableProps = {
    projectId: string;
};

const ProjectMembersTable = ({ projectId }: ProjectMembersTableProps) => {
    const {t} = useTranslation('members');
    const { t: t2 } = useTranslation('roles');

    const columns: ColumnDefinition[] = [
        { id: 'firstName', label: t('firstName'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'lastName', label: t('lastName'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'createdOn', label: t('createdOn'), type: 'DATE_TIME', minWidth: 120, sortable: true, filterable: true },
        { id: 'createdBy', label: t('createdBy'), type: 'TEXT', minWidth: 150, sortable: true, filterable: true },
        { id: 'role', label: t('role'), type: 'ENUM', minWidth: 150, sortable: true, filterable: true, enumValues: [t2(Role.OWNER), t2(Role.VISITOR), t2(Role.MAINTAINER)] },
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
                            role: t2(member.role),
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