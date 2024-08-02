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
    //const [open, setOpen] = useState(false)
    const {t} = useTranslation('forms')
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


    function formTypeDeclaration(typeFromDropdown: ResourceType) {
        switch (typeFromDropdown) {
            case  'ATTACHMENT': {
                const formElements: FormElement[] = [
                    {
                        name: 'nameLabel',
                        id: "nameLabel",
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'name',
                        id: 'name',
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                    {
                        name: 'descriptionLabel',
                        id: "descriptionLabel",
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'description',
                        id: 'description',
                        defaultValue: t('description'),
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
                        name: 'nameLabel',
                        id: "nameLabel",
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'name',
                        id: 'name',
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                    {
                        name: 'descriptionLabel',
                        id: "descriptionLabel",
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'description',
                        id: 'description',
                        defaultValue: t('secret'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'valueLabel',
                        id: "valueLabel",
                        defaultValue: t('secret'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'value',
                        id: 'value',
                        defaultValue: t('value'),
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
                        name: 'nameLabel',
                        id: "nameLabel",
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'name',
                        id: 'name',
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                    {
                        name: 'descriptionLabel',
                        id: "descriptionLabel",
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'description',
                        id: 'description',
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'valueLabel',
                        id: "valueLabel",
                        defaultValue: t('link'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'value',
                        id: 'value',
                        defaultValue: t('linkValue'),
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
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'name',
                        id: 'name',
                        defaultValue: t('name'),
                        typeOfElement: {
                            Component: CustomTextField,
                            props: {}
                        }
                    },
                    {
                        name: 'descriptionLabel',
                        id: "descriptionLabel",
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'description',
                        id: 'description',
                        defaultValue: t('description'),
                        typeOfElement: {
                            Component: CustomTextArea,
                            props: {}
                        }
                    },
                    {
                        name: 'textLabel',
                        id: "textLabel",
                        defaultValue: t('text'),
                        typeOfElement: {
                            Component: CustomLabelText,
                            props: {}
                        }
                    },
                    {
                        name: 'text',
                        id: 'text',
                        defaultValue: t('text'),
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
            name: t('resourceType'),
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
        setForm(form as CreateResourceForm);
        api.resources.create(form, typeSetter).then(
            response => {console.log("Response value",response.value)}
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
            <CustomForm formElements={formElements2} buttonName={t('chooseType')} handleSubmit={handleSubmit2}></CustomForm>
            <CustomForm formElements={formForType} buttonName={t('create')} handleSubmit={handleSubmit} buttonDisable={buttonState} ></CustomForm>
        </div>
    )
}