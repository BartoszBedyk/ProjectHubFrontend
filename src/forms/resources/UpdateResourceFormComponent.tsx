import {UpdateResourceForm} from "../../api/resources/form/UpdateResourceForm";
import CustomForm, {FormElement, LabelTextArea, TextArea, TextField} from "../../components/UpdateForms/CustomForm";
import React, {useEffect, useState} from "react";
import {api} from "../../api/AppApi";

interface updateProps {
    id: string
}

export function UpdateResourceFormComponent(props: updateProps) {
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
                    }
             catch (error) {
                console.error('Error fetching elements data:', error);
            }
        }

        fetchElements();
    }, [props.id]);



    // deklarujecie elenety formularza  przed textArea, textField musicie deklarować oddzielnie Label jako LabelTextArea
    //jeżeli macie checkboxy to one mają wbudowany Label którego treść podajecie w name
    //każdy element musi mieć typeOfElement bez tego się nie wygenereuje, i każdy musi mieć name bez tego nie przypisze danych

    const formElements: FormElement[] = [
        {
            name: 'nameLabel',
            id: "nameLabel",
            defaultValue: "Name: ",
            typeOfElement: {
                Component: LabelTextArea,
                props: {}
            }
        },
        {
            name: 'name',
            id: 'name',
            defaultValue: form.name,
            typeOfElement: {
                Component: TextField,
                props: {}
            }
        },
        {
            name: 'valueLabel',
            id: "valueLabel",
            defaultValue: "Value: ",
            typeOfElement: {
                Component: LabelTextArea,
                props: {}
            }
        },
        {
            name: 'value',
            id: 'value',
            defaultValue: form.value,
            typeOfElement: {
                Component: TextField,
                props: {}
            }
        },
        {
            name: 'descriptionLabel',
            id: "descriptionLabel",
            defaultValue: "Description: ",
            typeOfElement: {
                Component: LabelTextArea,
                props: {}
            }
        },
        {
            name: 'description',
            id: 'description',
            defaultValue: form.description,
            typeOfElement: {
                Component: TextArea,
                props: {}
            }
        }
    ]
    //tutaj jedynie zmieniacie api na swoje
    const handleSubmit = (formData: Record<string, any>) => {
        console.log(formData);

        api.resources.updateResource(formData as UpdateResourceForm).then(
            response => {
                console.log("Edited values:", response)
            }
        )
            .catch(error => console.log("Update values error: ", error))
    }


    return (
        <CustomForm formElements={formElements} buttonName='Update' handleSubmit={handleSubmit}
                    id={props.id}></CustomForm>
    )

}