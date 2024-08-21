import React, {useState} from "react";
import {
    Box,
    Typography,
    Paper,
    FormControl,
    Button,
    Checkbox,
    Select,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import UploadFileZone from "./UploadFile";
import {api} from "../../api/AppApi";

const textAreaStyle: React.CSSProperties = {
    padding: '12px 16px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    boxSizing: 'content-box',
    overflow: 'auto',
    resize: 'both',
    width: '80%',
    background: 'inherit',
    color:'inherit'
};

const textFieldStyle: React.CSSProperties = {
    padding: "12px 16px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.5,
    background: 'inherit',
    color:'inherit'
};

const labelStyle: React.CSSProperties = {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: '1.5em',
    paddingRight: '10px',
    background: 'inherit',
    color:'inherit'

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
    placeholder?:string;
    error?: string;
    typeOfElement: ComponentType;
    menuItems?: MenuItem[];
}

export interface MenuItem {
    value: string | number | undefined;
}

export interface UpdateFormProps {
    formElements: FormElement[];
    buttonName: string;
    handleSubmit: (formData: Record<string, any>, additionalValue: string) => void;
    id?: string;
    buttonDisable? :boolean
}

export const CustomTextArea: React.FC<{ name?: string, id?: string, defaultValue?: string, error?: string, placeholder?: string}> =
    ({name, id, defaultValue, error,placeholder}) => (
        <div>
            <textarea name={name} id={id} defaultValue={defaultValue} style={textAreaStyle} placeholder={placeholder}/>
            {error && <p style={customError}>{error}</p>}
        </div>
    );

export const CustomTextField: React.FC<{
    type?: string;
    name?: string;
    id?: string,
    defaultValue?: string,
    placeholder?: string,
    error?: string
}> =
    ({type = "text", name, id, defaultValue, error, placeholder}) => (
        <div>
            <input type={type} name={name} id={id} defaultValue={defaultValue} style={textFieldStyle} placeholder={placeholder}/>
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

export const CustomDropdown: React.FC<{
    name?: string,
    id?: string,
    error?: string,
    menuItems: MenuItem[],
    value: string,
    onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
}> =
    ({name, id, error, menuItems, value, onChange}) => (
        <div>
            <label>{name}:</label>
            <Select id={id} value={value} onChange={onChange} defaultValue={ResourceType.link} name="dropdown">
                {menuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )

export const CustomDropZone: React.FC<{
    error?: string,
    onFileUpload?: (file: File) => void
}> =
    ({error, onFileUpload}) => (
        <div>
            <UploadFileZone name="file" onFileUpload={onFileUpload}></UploadFileZone>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )

export const CustomForm: React.FC<UpdateFormProps> = ({formElements, buttonName, handleSubmit , id, buttonDisable}) => {
    const [errors, setErrors] = useState<errorHandler[]>([]);
    const {t} = useTranslation('overall');
    const [dropdownValue, setDropdownValue] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

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

        if (id) formData['id'] = id;

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
            if (file) {
                formData['file'] = file;
            }
        } else {
            console.error('No form elements found.');
        }

        setErrors(newErrors);


            if (file) {
                api.attachment.upload(file).then(r => {
                    formData['value'] = r.id;
                    handleSubmit(formData, dropdownValue);
                });
            } else {
                handleSubmit(formData, dropdownValue);
            }
        }


    const handleDropdownChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setDropdownValue(event.target.value);
    };

    const handleFileUpload = (uploadedFile: File) => {
        setFile(uploadedFile);
    };

    return (
        <Paper sx={{width: 'auto', mb: 2, margin: 3}}>
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2}}>
                <Box sx={{width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2}}/>
                <Typography variant="h5" component="div">
                    {buttonName}
                </Typography>
            </Box>
            <FormControl sx={{padding: 2, width: '100%'}}>
                <form onSubmit={onSubmit}>
                    {formElements.map(({
                                           name,
                                           id,
                                           label,
                                           defaultValue,
                                           placeholder,
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
                                    placeholder={placeholder}
                                    error={error}
                                    onChange={name === "dropdown" ? handleDropdownChange : undefined}
                                    onFileUpload={name === "file" ? handleFileUpload : undefined}
                                />
                            </div>
                        );
                    })}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button sx={{marginTop: 2}} variant="contained" type="submit" disabled={buttonDisable}>
                            {buttonName}
                        </Button>
                    </div>
                </form>
            </FormControl>
        </Paper>
);
};

export default CustomForm;
