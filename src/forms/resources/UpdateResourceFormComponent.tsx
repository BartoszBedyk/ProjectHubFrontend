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
    id: string
}

export function UpdateResourceFormComponent(props: updateProps) {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<UpdateResourceForm>({
        id: props.id,
        name: '',
        description: '',
        value: ''
    });

    useEffect(() => {
        const fetchElements = async () => {
            try {
                const elements = await api.resources.get(props.id)
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
    }, [props.id]);

    const linkToPage = "/project/resources/any"
    const navigate = useNavigate();
    const {t} = useTranslation("overall")


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
                        id={props.id}></CustomForm>
            <UpdateDialog openProps={open} title={t('resources.dialogUpdateTitle')} message={t('resources.dialogUpdate')}></UpdateDialog>
        </div>
    )

}