import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import ActivitiesTable from "../../components/TableImpl/ActivitiesTable";

const Activities = () => {

    return (
        <CustomLayout>
            <ActivitiesTable searchValue='' />
        </CustomLayout>
    );
};

export default Activities;