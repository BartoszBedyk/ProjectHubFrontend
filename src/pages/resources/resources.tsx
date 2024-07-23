import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import AllResourcesTable from "../../components/TableImpl/AllResourcesTable";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import {useParams} from "react-router-dom";

function Resources() {
    const {t} = useTranslation("resources");
    let { type } = useParams();

        switch (type) {
            case "link": {
                type = ResourceType.link;
                break;
            }
            case "secret": {
                type = ResourceType.secret;
                break;
            }
            case "text": {
                type = ResourceType.text;
                break;
            }
            case "attachment": {
                type = ResourceType.attachment;
                break;
            }
            default:
                type = "";
        }
    console.log("Typ: ", type);
    return (
        <div><CustomLayout>
            <h1>ProjectName {t('resourcestxt')}</h1>
            <h2>Here are resources of te project</h2>
            <h3> Then Dorlas by his black sword, the fame whereof had come even into the deeps of Brethil,
                and by his quest of the King’s daughter, knew that this Wildman was indeed the Mormegil of Nargothrond,
                whom rumour said was the son of Hurin of Dorlomin. </h3>
            <AllResourcesTable searchValue="Kacpra" resourceType={type as ResourceType}></AllResourcesTable>
        </CustomLayout>

            </div>

    );
}

export default Resources;