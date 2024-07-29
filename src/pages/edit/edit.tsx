import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {UpdateResourceFormComponent} from "../../forms/resources/UpdateResourceFormComponent";
import {useParams} from "react-router-dom";




function Edit() {
    let { id } = useParams();
    if(id==undefined){
        id='empty'
    }
    return (
        <CustomLayout>
            <UpdateResourceFormComponent id={id} ></UpdateResourceFormComponent>
        </CustomLayout>
    );
}

export default Edit;