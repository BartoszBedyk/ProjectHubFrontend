import React from 'react';
import CustomLayout from "../../components/Layout/Layout";

import {UpdateResourceFormComponent} from "../../forms/resources/UpdateResourceFormComponent";


function Edit() {
    return (
        <CustomLayout>
            <h1>Edit</h1>
            <h2>Edit form</h2>
            <h3>lorem ipsum</h3>

            <UpdateResourceFormComponent id="404be238-5687-473c-b035-ff73a8aa858d" ></UpdateResourceFormComponent>
        </CustomLayout>
    );
}

export default Edit;