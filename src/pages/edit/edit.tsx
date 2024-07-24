import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import CustomForm, {
    FormElement,
    LabelTextArea,
    TextArea,
    TextField,
    CheckBoxField
} from "../../components/UpdateForms/CustomForm";


function Edit() {

    const formElements: FormElement[] = [
        {
            name: 'Label',
            id:"desc",
            defaultValue:"Description:",
            typeOfElement:{
                Component: LabelTextArea,
                props: {}
            }
        },
        {
            name: 'Description',
            id: 'desc',
            defaultValue: 'TextArea',
            typeOfElement: {
                Component: TextArea,
                props: {}
            }
        },
        {
            name: 'TextField',
            id:"user",
            defaultValue:"User:",
            typeOfElement:{
                Component: LabelTextArea,
                props: {}
            }
        },
        {
            name: 'TextField',
            id: 'user',
            defaultValue: 'TextField',
            typeOfElement: {
                Component: TextField,
                props: { type: 'text' }
            }
        },
        {
            name: 'Label',
            id:"password",
            defaultValue:"Password:",
            typeOfElement:{
                Component: LabelTextArea,
                props: {}
            }
        },

        {
            name: 'Password',
            typeOfElement: {
                Component: TextField,
                props: { type: 'password' }
            }
        },
        {
            name: 'Checkbox',
            id: 'checkbox',
            typeOfElement:{
                Component: CheckBoxField,
                props: {
                    checked: "True",

                }
            }
        }
    ]

    const url = "/href/url/link"

    return (
        <CustomLayout>
            <h1>Edit</h1>
            <h2>Edit form</h2>
            <h3>lorem ipsum</h3>

            <CustomForm formElements={formElements} url={url} buttonName='buttonName'></CustomForm>

        </CustomLayout>
    );
}

export default Edit;