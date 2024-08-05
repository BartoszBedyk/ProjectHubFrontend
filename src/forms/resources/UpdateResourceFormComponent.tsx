import {UpdateResourceForm} from "../../api/resources/form/UpdateResourceForm";
import CustomForm, {
    FormElement,
    CustomLabelText,
    CustomTextArea,
    CustomTextField, CustomDropZone
} from "../../components/UpdateForms/CustomForm";
import React, {useEffect, useState} from "react";
import {api} from "../../api/AppApi";
import {UpdateDialog} from "../../components/dialogs/UpdateDialog";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


interface updateProps {
    resourceId: string
    projectId: string
}

export function UpdateResourceFormComponent({resourceId, projectId}: updateProps) {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<UpdateResourceForm>({
        id: resourceId,
        name: '',
        description: '',
        value: ''
    });

    useEffect(() => {
        const fetchElements = async () => {
            try {
                console.log(resourceId)
                const elements = await api.resources.get(resourceId)
                console.log("elements", elements)
                setForm({
                    id: elements.id,
                    name: elements.name,
                    description: elements.description,
                    value: elements.value,
                })
            } catch (error) {
                console.error('Error fetching elements data:', error);
            }
        }

        fetchElements();
    }, [resourceId, projectId]);


    const linkToPage = `/project/${projectId}/resources/details/${resourceId}`
    const navigate = useNavigate();
    const {t} = useTranslation("overall")

    console.log(form)
    const formElements: FormElement[] = [
        {
            name: 'nameLabel',
            id: "nameLabel",
            defaultValue: t('forms.name'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {}
            }
        },
        {
            name: 'name',
            id: 'name',
            defaultValue: form.name,
            typeOfElement: {
                Component: CustomTextField,
                props: {}
            }
        },
        {
            name: 'valueLabel',
            id: "valueLabel",
            defaultValue: t('forms.value'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {}
            }
        },
        {
            name: 'value',
            id: 'value',
            defaultValue: form.value,
            typeOfElement: {
                Component: CustomTextField,
                props: {}
            }
        },
        {
            name: 'descriptionLabel',
            id: "descriptionLabel",
            defaultValue: t('forms.description'),
            typeOfElement: {
                Component: CustomLabelText,
                props: {}
            }
        },
        {
            name: 'description',
            id: 'description',
            defaultValue: form.description,
            typeOfElement: {
                Component: CustomTextArea,
                props: {}
            }
        }
    ]
    const handleSubmit = (formData: Record<string, any>) => {
        console.log(formData);

        api.resources.updateResource(formData as UpdateResourceForm).then(
            response => {
                setOpen(true);
                setTimeout(() => {
                    navigate(linkToPage);
                }, 1000);

            }
        )
            .catch(error => console.log("Update values error: ", error))


    }

    useEffect(() => {
        if (open) {
            console.log("Dialog should be open now:", open);
        }
    }, [open]);


    return (
        <div>
            <CustomForm formElements={formElements} buttonName={t('resources.update')} handleSubmit={handleSubmit}
                        id={resourceId}></CustomForm>
            <UpdateDialog openProps={open} title={t('resources.dialogUpdateTitle')} message={t('resources.dialogUpdate')}></UpdateDialog>
        </div>
    )

}