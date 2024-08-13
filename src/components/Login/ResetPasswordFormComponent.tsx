import CustomForm, {CustomLabelText, CustomTextField, FormElement} from "../UpdateForms/CustomForm";
import {useTranslation} from "react-i18next";
import {api} from "../../api/AppApi";
import {useState} from "react";
import {ResetPasswordForm} from "../../api/login-pass-auth/form/ResetPasswordForm";
import {ResetPasswordConfirmForm} from "../../api/login-pass-auth/form/ResetPasswordConfirmForm";
import {useNavigate, useParams} from "react-router-dom";
import ResetPassword from "../../pages/reset-password/ResetPassword";


export const ResetPasswordFormComponent = () => {
    const {t} = useTranslation('login');
    const [globalError, setGlobalError] = useState<string>('');
    const [global, setGlobal] = useState<string>('');
    const {requestID} = useParams<{ requestID: string }>()
    const [form, setForm] = useState<ResetPasswordConfirmForm>(
        {
            password: '',
            passwordRepeated: '',
            requestId: requestID!
        }
    );
    const navigate = useNavigate();

    const formElements: FormElement[] = [
        {
            name: 'newPasswordLabel',
            id: "newPasswordLabel",
            defaultValue: t('newPassword'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'newPassword',
            id: 'newPassword',
            placeholder: t('newPassword'),
            typeOfElement: {
                Component: CustomTextField,
                props: {},
            },
        },
        {
            name: 'newPasswordLabel2',
            id: "newPasswordLabel2",
            defaultValue: t('newPassword2'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'newPassword2',
            id: 'newPassword2',
            placeholder: t('newPassword2'),
            typeOfElement: {
                Component: CustomTextField,
                props: {},
            },
        },
    ];


        const handleSubmit = async (formData: Record<string, any>) => {
            const newFormData: ResetPasswordConfirmForm  = {
                password: formData['newPassword'],
                passwordRepeated: formData['newPassword2'],
                requestId: requestID!

            };
            console.log(newFormData);


            await api.loginPassAuth.resetPassword(newFormData as ResetPasswordConfirmForm).then(
                response => {
                    setGlobalError(t('correctResetPassword'));
                    setTimeout(() => {
                        console.log(response)
                        navigate("/auth/login")
                    }, 5000);

                }
            )
                .catch(error => {
                    console.log("Error", error);
                    switch (error.response?.data?.errors?.password || error.response?.data?.errors?.passwordRepeated || error.response?.data?.errors?.requestId || error.response?.data?.message) {
                        case "Password must not be blank":
                            setGlobalError(t('errorResetBlank'));
                            break;
                        case "Password must be at least 8 characters long":
                            setGlobalError(t('errorResetLength8'));
                            break;
                        case "ID must be 36 characters long":
                            setGlobalError(t("errorResetIdLength36"));
                            break;
                        case "ID must not be null":
                            setGlobalError(t('errorResetIdNull'));
                            break;
                        case "Passwords must match":
                            setGlobalError(t('errorResetPasswordMatch'));
                            break;
                        case "User not found":
                            setGlobalError(t('errorResetNotFound'));
                            break;
                            case "Link expired":
                            setGlobalError(t('errorResetNotFound'));
                            break;
                        default:
                            setGlobalError(t('unknownError'));
                            break;
                    }

                    setGlobalError(prevError => `${prevError}`);
                    console.log(globalError)
                });

        };



    return (
        <div>
            <CustomForm formElements={formElements} buttonName={t('resetPassword')} handleSubmit={handleSubmit}/>
            {globalError && <p style={{color: 'red', marginLeft: '10%'}}>{globalError}</p>}
            {global && <p style={{marginLeft: '10%'}}>{global}</p>}
        </div>
    );
};
