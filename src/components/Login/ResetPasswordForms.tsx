import CustomForm, {CustomLabelText, CustomTextField, FormElement} from "../UpdateForms/CustomForm";
import {useTranslation} from "react-i18next";
import {api} from "../../api/AppApi";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {ResetPasswordForm} from "../../api/login-pass-auth/form/ResetPasswordForm";
import {useState} from "react";


export const ResetPasswordForms = () => {
    const {t} = useTranslation('login');
    const [globalError, setGlobalError] = useState<string>('')
    const [global, setGlobal] = useState<string>('')

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
        const email = formData.email
        api.loginPassAuth.resetPasswordRequest(formData as ResetPasswordForm)
            .then(response => {setGlobal('Wysłano link na podany adres email.')})
            .catch((error) => {
            console.log(error);
            setGlobalError(error.response.data.message)
        })
    };

    return(

        <div>
            <CustomForm formElements={formElements} buttonName={t('resetPassword')} handleSubmit={handleSubmit}/>
            {globalError && <p style={{color: 'red', marginLeft:'10%'}}>{globalError}</p>}
            {global && <p style={{ marginLeft:'10%'}}>{global}</p>}
        </div>
    )
}