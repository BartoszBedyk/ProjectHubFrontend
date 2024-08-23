import { useTranslation } from "react-i18next";

export function useParamName() {
    const { t } = useTranslation('activity');

    const getParamName = (paramName: string): string => {
        switch (paramName) {
            case "DOCUMENT_ID":
                return t('param.documentId');
            case "USER_ID":
                return t('param.userId');
            case "FIRST_NAME":
                return t('param.firstName');
            case "LAST_NAME":
                return t('param.lastName');
            case "KEY_ID":
                return t('param.firstName');
            default:
                return 'Unknown enum type';
        }
    };

    return { getParamName };
}