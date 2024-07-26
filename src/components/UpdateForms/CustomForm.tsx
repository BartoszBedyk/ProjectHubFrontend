import React, {CSSProperties} from "react";
import {Box, Typography, Paper, FormControl, Button, Checkbox} from "@mui/material";


const textAreaStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#424242',
    boxSizing: 'content-box',
    overflow: 'auto',
    resize: 'both',
    width: '80%',

};

const textFieldStyle: React.CSSProperties = {
    padding: "12px 16px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    backgroundColor: "#fff",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.5,
    color: "#424242",
};

const labelStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '1.5em',
    paddingRight: '10px',

}

const button: React.CSSProperties = {
    padding: "10px 20px",
    border: ".25rem",
    fontSize: "14px",
    marginTop: "10px",
    marginBottom: "5px",
    marginRight: "10px",
    transition: "all .3s ease-in-out"
}

const checkboxStyle: React.CSSProperties = {}


export const CustomTextArea: React.FC<{ name?: string, id?: string, defaultValue?: string }> =
    ({name, id, defaultValue}) =>
        (
            <textarea name={name} id={id} defaultValue={defaultValue} style={textAreaStyle}/>
        );

export const CustomTextField: React.FC<{ type?: string; name?: string; id?: string, defaultValue?: string}> =
    ({type = "text", name, id, defaultValue}) =>
        (
            <input type={type} name={name} id={id} defaultValue={defaultValue}  style={textFieldStyle}/>
        );

export const CustomLabelText: React.FC<{ name?: string; htmlFor?: string, defaultValue?: string }> =
    ({name, htmlFor, defaultValue}) =>
        (
            <label htmlFor={htmlFor} style={labelStyle}> {defaultValue || name} </label>
        );

export const CustomCheckBox: React.FC<{ name?: string, id?: string, checked?: boolean }> =
    ({name, id, checked}) =>
        (
            <div>
                <label> {name}: </label>
                <Checkbox id={id} name={name} defaultChecked={checked} style={checkboxStyle}></Checkbox>
            </div>

        )


type ComponentType = {
    Component: React.FC<any> | React.ComponentClass<any>;
    props: Record<string, any>;
};

export interface FormElement {
    name: string;
    id?: string;
    label?: string;
    defaultValue?: string;
    typeOfElement: ComponentType;
}

export interface UpdateFormProps {
    formElements: FormElement[];
    buttonName: string;
    handleSubmit: (formData: Record<string, any>) => void;
    id: string;

}


const CustomForm: React.FC<UpdateFormProps> = ({formElements, buttonName, handleSubmit, id}) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const formData: Record<string, any> = {};
        const elements = event.currentTarget.elements as HTMLCollectionOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

        formData['id'] = id;


        const formElementsArray = Array.from(elements).filter(
            (element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
                element instanceof HTMLInputElement ||
                element instanceof HTMLSelectElement ||
                element instanceof HTMLTextAreaElement
        );


        if (formElementsArray.length > 0) {
            formElementsArray.forEach(element => {
                if (element.name) {
                    formData[element.name] = element.value;
                }
            });
        } else {
            console.error('No form elements found.');
        }


        handleSubmit(formData);
    };

    return (


        <Paper sx={{width: 'auto', mb: 2, margin: 3}}>
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2}}>
                <Box sx={{width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2}}/>
                <Typography variant="h5" component="div">
                    Update:
                </Typography>


            </Box>
            <FormControl sx={{padding: 2, width: '100%'}}>
                <form onSubmit={onSubmit}>
                    {formElements.map(({
                                           name,
                                           id,
                                           label,
                                           defaultValue,
                                           typeOfElement: {Component, props}
                                       }, index) => (
                        <div key={index}>
                            {label && <label htmlFor={id}>{label}</label>}
                            <Component
                                {...props}
                                name={name}
                                id={id}
                                defaultValue={defaultValue}
                            />
                        </div>
                    ))}

                    <Button
                        sx={{marginTop: 2}}
                        variant="contained"
                        type="submit">
                        {buttonName}
                    </Button>
                </form>
            </FormControl>
        </Paper>

    );
};


export default CustomForm;