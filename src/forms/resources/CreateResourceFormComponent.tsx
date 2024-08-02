import React, {useState} from "react";
import {
    CustomDropdown, CustomDropZone,
    CustomForm,
    CustomLabelText,
    CustomTextArea,
    CustomTextField,
    FormElement, MenuItem
} from "../../components/UpdateForms/CustomForm";
import {CreateResourceForm} from "../../api/resources/form/CreateResourceForm";
import {api} from "../../api/AppApi";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import {useTranslation} from "react-i18next";
import {UpdateDialog} from "../../components/dialogs/UpdateDialog";
import {useNavigate} from "react-router-dom";

interface createResourceProps {
    projectId: string,
    environmentId: string
}


function decide(typeFromDropdown: ResourceType): string {

    switch (typeFromDropdown) {
        case  'ATTACHMENT': {
            return "attachment"
        }
        case 'SECRET': {
            return "secret"
        }
        case 'LINK': {
            return "link"
        }
        case 'TEXT': {
            return "text"
        }
        default: {
            return ""
        }
    }
}

export function CreateResourceFormComponent({projectId, environmentId}: createResourceProps) {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation('overall')
    const [form, setForm] = useState<CreateResourceForm>({
        name: '',
        description: '',
        value: '',
        environmentId: environmentId = "testEnvironmentId",
        projectId: projectId
    });
    const [formForType, setFormForType] = useState<FormElement[]>(
     [
        {
            name: '',
            id: "",
            defaultValue: '',
            typeOfElement: {
                Component: CustomLabelText,
                props: {}
            }
        }
         ]
    )
    const [buttonState, setButtonState] = useState<boolean>(true)
    const [typeSetter, setTypeSetter] = useState<string>("")
    const linkToPage = `/project/${projectId}/resources/${typeSetter}`
    const navigate = useNavigate();

    function formTypeDeclaration(typeFromDropdown: ResourceType) {
        switch (typeFromDropdown) {
            case  'ATTACHMENT': {
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
                        defaultValue: t('forms.name'),
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
                        defaultValue: t('forms.description'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'file',
                        id: 'file',
                        defaultValue: "file",
                        typeOfElement: {
                            Component: CustomDropZone,
                            props: {}
                        }
                    }


                ]
                setFormForType(formElements)
                break;
            }
            case 'SECRET': {
                const formElements: FormElement[] = [
                    {
                        name: t('forms.name'),
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
                        defaultValue: t('forms.name'),
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
                        defaultValue: t('forms.secret'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'valueLabel',
                        id: "valueLabel",
                        defaultValue: t('forms.secret'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'value',
                        id: 'value',
                        defaultValue: t('forms.value'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                ]
                setFormForType(formElements)
                break;
            }
            case 'LINK': {
                const formElements: FormElement[] = [
                    {
                        name: t('forms.name'),
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
                        defaultValue: t('forms.name'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                    {
                        name: t('forms.description'),
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
                        defaultValue: t('forms.description'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'valueLabel',
                        id: "valueLabel",
                        defaultValue: t('forms.link'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'value',
                        id: 'value',
                        defaultValue: t('forms.linkValue'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                ]
                setFormForType(formElements)
                break;
            }
            case 'TEXT': {
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
                        defaultValue: t('forms.name'),
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
                        defaultValue: t('forms.description'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'textLabel',
                        id: "textLabel",
                        defaultValue: t('forms.text'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'value',
                        id: 'value',
                        defaultValue: t('forms.text'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                ]
                setFormForType(formElements)
                break;
            }
            default: {
                return ""
            }
        }
    }

    const menuItems: MenuItem[] = [
        {value: ResourceType.link},
        {value: ResourceType.text},
        {value: ResourceType.secret},
        {value: ResourceType.attachment}
    ]

    const formElements2: FormElement[] = [
        {
            name: t('forms.resourceType'),
            id: 'value',
            defaultValue: 'Choose',
            typeOfElement: {
                Component: CustomDropdown,
                props: {
                    menuItems
                }
            }
        }
    ]


    const handleSubmit = (formData: Record<string, any>) => {
        let form = {
            name: formData.name,
            description: formData.description,
            value: formData.value,
            environmentId: environmentId,
            projectId: projectId,
        }
        console.log(form)
        setForm(form as CreateResourceForm);
        api.resources.create(form, typeSetter).then(
            response => {
                setOpen(true);
                setTimeout(() => {
                    navigate(linkToPage);
                }, 1000);}
        )

    }

    const handleSubmit2 = (formData: Record<string, any>) => {
        const typeFromDropdown: ResourceType = formData['dropdown'];
        setButtonState(false)
        formTypeDeclaration(typeFromDropdown);
        setTypeSetter(decide(typeFromDropdown))
    }




    return (
        <div>
            <CustomForm formElements={formElements2} buttonName={t('forms.chooseType')} handleSubmit={handleSubmit2}></CustomForm>
            <CustomForm formElements={formForType} buttonName={t('forms.create')} handleSubmit={handleSubmit} buttonDisable={buttonState} ></CustomForm>
            <UpdateDialog openProps={open} title={t('resources.dialogCreateTitle')} message={t('resources.dialogCreate')}></UpdateDialog>
        </div>
    )
}