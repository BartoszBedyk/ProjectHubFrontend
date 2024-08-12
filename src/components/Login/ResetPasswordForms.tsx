import CustomForm, {CustomLabelText, CustomTextField, FormElement} from "../UpdateForms/CustomForm";
import {useTranslation} from "react-i18next";
import {api} from "../../api/AppApi";
import {useState} from "react";
import {ResetPasswordForm} from "../../api/login-pass-auth/form/ResetPasswordForm";

type ResetPasswordFormsProps = {
    onError: (error: boolean) => void;
};

export const ResetPasswordForms = ({ onError }: ResetPasswordFormsProps) => {
    const {t} = useTranslation('login');
    const [globalError, setGlobalError] = useState<string>('');
    const [global, setGlobal] = useState<string>('');

    const formElements: FormElement[] = [
        {
            name: 'nameLabel',
            id: "nameLabel",
            defaultValue: t('resetPassword'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'email',
            id: 'email',
            placeholder: t('loginName'),
            typeOfElement: {
                Component: CustomTextField,
                props: {},
            },
        },
    ];

    const handleSubmit = (formData: Record<string, any>) => {
        console.log(formData);
        const email = formData.email;
        api.loginPassAuth.resetPasswordRequest(formData as ResetPasswordForm)
            .then(response => {
                setGlobal(t('correctEmail'));
                setGlobalError('');
                onError(false);
            })
            .catch((error) => {
                switch (error.response.data.message) {
                    case "Invalid data provided":
                        setGlobalError(t('errorNotEmail'));
                        break;
                    case "User not found":
                        setGlobalError(t('errorBadEmail'));
                        break;
                    default:
                        setGlobalError(t('errorUnknown'));
                        break;
                }
            });
    };

    return (
        <div>
            <CustomForm formElements={formElements} buttonName={t('resetPassword')} handleSubmit={handleSubmit} />
            {globalError && <p style={{color: 'red', marginLeft:'10%'}}>{globalError}</p>}
            {global && <p style={{ marginLeft:'10%'}}>{global}</p>}
        </div>
    );
};
