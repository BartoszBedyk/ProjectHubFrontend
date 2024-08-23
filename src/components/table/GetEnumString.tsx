import { ActivityTypeDto } from "../../api/activity/response/ActivityTypeDto";
import { useTranslation } from "react-i18next";

export function useGetEnumString() {
    const { t } = useTranslation('activity');

    const getEnumString = (type: ActivityTypeDto): string => {
        switch (type) {
            case ActivityTypeDto.CREATE_USER:
                return t('enum.createUser');
            case ActivityTypeDto.USER_LOG_IN_SUCCESS:
                return t('enum.userLogInSuccess');
            case ActivityTypeDto.USER_LOG_IN_FAILED:
                return t('enum.userLogInFailed');
            case ActivityTypeDto.USER_LOG_OUT:
                return t('enum.userLogOut');
            case ActivityTypeDto.DELETE_USER:
                return t('enum.deleteUser');
            case ActivityTypeDto.DOCUMENT_OPEN:
                return t('enum.documentOpen');
            case ActivityTypeDto.KEY_OPEN:
                return t('enum.keyOpen');
            case ActivityTypeDto.DOCUMENT_DOWNLOAD:
                return t('enum.documentDownload');
            case ActivityTypeDto.CREATE_PROJECT_MEMBER:
                return t('enum.createProjectMember');
            case ActivityTypeDto.UPDATE_PROJECT_MEMBER:
                return t('enum.updateProjectMember');
            case ActivityTypeDto.DELETE_PROJECT_MEMBER:
                return t('enum.deleteProjectMember');
            case ActivityTypeDto.CREATE_PROJECT_ENVIRONMENT:
                return t('enum.createProjectEnvironment');
            case ActivityTypeDto.UPDATE_PROJECT_ENVIRONMENT:
                return t('enum.updateProjectEnvironment');
            case ActivityTypeDto.DELETE_PROJECT_ENVIRONMENT:
                return t('enum.deleteProjectEnvironment');
            case ActivityTypeDto.UPDATE_PROJECT:
                return t('enum.updateProject');
            case ActivityTypeDto.CREATE_RESOURCE:
                return t('enum.createResource');
            case ActivityTypeDto.UPDATE_RESOURCE:
                return t('enum.updateResource');
            case ActivityTypeDto.DELETE_RESOURCE:
                return t('enum.deleteResource');
            default:
                return 'Unknown enum type';
        }
    };

    return { getEnumString };
}