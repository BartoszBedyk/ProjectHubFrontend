import React, {CSSProperties, useState} from "react";
import {Box, Typography, Paper, FormControl, Button, Checkbox} from "@mui/material";
import {useTranslation} from "react-i18next";

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

const customError: React.CSSProperties = {
    color: "red",
    fontSize: "12px",
    padding: "0",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "1%"
}

const checkboxStyle: React.CSSProperties = {}

type errorHandler = {
    id: string,
    message: string,
}

type ComponentType = {
    Component: React.FC<any> | React.ComponentClass<any>;
    props: Record<string, any>;
};

export interface FormElement {
    name: string;
    id?: string;
    label?: string;
    defaultValue?: string;
    error?: string
    typeOfElement: ComponentType;
}

export interface UpdateFormProps {
    formElements: FormElement[];
    buttonName: string;
    handleSubmit: (formData: Record<string, any>) => void;
    id: string;
}

export const CustomTextArea: React.FC<{ name?: string, id?: string, defaultValue?: string, error?: string }> =
    ({name, id, defaultValue, error}) => (
        <div>
            <textarea name={name} id={id} defaultValue={defaultValue} style={textAreaStyle}/>
            {error && <p style={customError}>{error}</p>}
        </div>
    );

export const CustomTextField: React.FC<{
    type?: string;
    name?: string;
    id?: string,
    defaultValue?: string,
    error?: string
}> =
    ({type = "text", name, id, defaultValue, error}) => (
        <div>
            <input type={type} name={name} id={id} defaultValue={defaultValue} style={textFieldStyle}/>
            {error && <p style={customError}>{error}</p>}
        </div>
    );

export const CustomLabelText: React.FC<{ name?: string; htmlFor?: string, defaultValue?: string, error?: string }> =
    ({name, htmlFor, defaultValue}) => (
        <label htmlFor={htmlFor} style={labelStyle}> {defaultValue || name} </label>
    );

export const CustomCheckBox: React.FC<{ name?: string, id?: string, checked?: boolean, error?: string }> =
    ({name, id, checked, error}) => (
        <div>
            <label> {name}: </label>
            <Checkbox id={id} name={name} defaultChecked={checked} style={checkboxStyle}></Checkbox>
            {error && <p style={customError}>{error}</p>}
        </div>
    )

export const CustomForm: React.FC<UpdateFormProps> = ({formElements, buttonName, handleSubmit, id}) => {
    const [errors, setErrors] = useState<errorHandler[]>([]);
    const {t} = useTranslation('overall');

    const isError = (message: string, id: string) => {
        if (message.length === 0) {
            const errorMessage = t('forms.validationError');
            return {id, message: errorMessage};
        }
        return null;
    };

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

        const newErrors: errorHandler[] = [];

        if (formElementsArray.length > 0) {
            formElementsArray.forEach(element => {
                if (element.name) {
                    formData[element.name] = element.value;
                    const error = isError(element.value, element.id);
                    if (error) {
                        newErrors.push(error);
                    }
                }
            });
        } else {
            console.error('No form elements found.');
        }

        setErrors(newErrors);

        if (newErrors.length === 0) {
            handleSubmit(formData);
        }
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
                                       }, index) => {
                        const error = errors.find(err => err.id === id)?.message;
                        return (
                            <div key={index}>
                                {label && <label htmlFor={id}>{label}</label>}
                                <Component
                                    {...props}
                                    name={name}
                                    id={id}
                                    defaultValue={defaultValue}
                                    error={error}
                                />
                            </div>
                        );
                    })}
                    <Button sx={{marginTop: 2}} variant="contained" type="submit">
                        {buttonName}
                    </Button>
                </form>
            </FormControl>
        </Paper>
    );
};

export default CustomForm;
