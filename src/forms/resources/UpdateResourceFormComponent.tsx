import {UpdateResourceForm} from "../../api/resources/form/UpdateResourceForm";
import CustomForm, {
    CustomLabelText,
    CustomTextArea,
    CustomTextField,
    FormElement,
} from "../../components/UpdateForms/CustomForm";
import React, {useEffect, useState} from "react";
import {api} from "../../api/AppApi";
import {UpdateDialog} from "../../components/dialogs/UpdateDialog";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";

interface updateProps {
    resourceId: string;
    projectId: string;
}

export function UpdateResourceFormComponent({resourceId, projectId}: updateProps) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<UpdateResourceForm>({
        id: resourceId,
        name: '',
        description: '',
        value: '',
    });

    const [type, setType] = useState<ResourceType>();
    const [globalError, setGlobalError] = useState<string>('');
    const navigate = useNavigate();
    const {t} = useTranslation("overall");

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const elements = await api.resources.get(resourceId);
                setType(elements.resourceType);
                setForm({
                    id: elements.id,
                    name: elements.name,
                    description: elements.description,
                    value: elements.value,
                });
            } catch (error) {
                console.error('Error fetching elements data:', error);
                setGlobalError(t('errors.fetchFailed'));
            }
        };

        fetchElements();
    }, [resourceId, projectId, t]);

    const linkToPage = `/project/${projectId}/resources/details/${resourceId}`;

    const formElements: FormElement[] = [
        {
            name: 'nameLabel',
            id: "nameLabel",
            defaultValue: t('forms.name'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'name',
            id: 'name',
            defaultValue: form.name,
            placeholder: form.name,
            typeOfElement: {
                Component: CustomTextField,
                props: {},
            },
        },
        {
            name: 'valueLabel',
            id: "valueLabel",
            defaultValue: t('forms.value'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'value',
            id: 'value',
            defaultValue: form.value,
            placeholder: form.value,
            typeOfElement: {
                Component: CustomTextField,
                props: {},
            },
        },
        {
            name: 'descriptionLabel',
            id: "descriptionLabel",
            defaultValue: t('forms.description'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {},
            },
        },
        {
            name: 'description',
            id: 'description',
            defaultValue: form.description,
            placeholder: form.description,
            typeOfElement: {
                Component: CustomTextArea,
                props: {},
            },
        },
    ];

    const handleSubmit = (formData: Record<string, any>) => {
        setGlobalError('');
        api.resources.updateResource(formData as UpdateResourceForm)
            .then(response => {
                console.log(response);
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate(linkToPage, { state: { showSnackbarEdit: true } });
                }, 1000);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.errors?.name || error.response?.data?.errors?.value
                setGlobalError(errorMessage);
                console.error("Error during update:", errorMessage);
                setGlobalError(prevError => `${prevError}`);
            });
    };

    useEffect(() => {
        if (open) {
            console.log("Dialog should be open now:", open);
        }
    }, [open, globalError]);

    return (
        <div>
            <CustomForm formElements={formElements} buttonName={t('resources.update')} handleSubmit={handleSubmit}
                        id={resourceId}/>
            {globalError && <p style={{color: 'red'}}>{globalError}</p>}
            {
                type === ResourceType.attachment && (
                    <p>{t('resources.attachmentDialog')}</p>
                )
            }
            <UpdateDialog openProps={open} title={t('resources.dialogUpdateTitle')}
                          message={t('resources.dialogUpdate')}/>
        </div>
    );
}
