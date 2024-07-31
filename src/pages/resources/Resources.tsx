import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import AllResourcesTable from "../../components/TableImpl/AllResourcesTable";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import {useParams} from "react-router-dom";

function Resources() {
    const {t} = useTranslation("resources");
    let { projectId, type } = useParams<{ projectId: string; type: string }>();

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
    return (
        <div><CustomLayout>
            <h1>ProjectName {t('resourcestxt')}</h1>
            <h2>Here are resources of te project</h2>
            <AllResourcesTable searchValue={projectId!} resourceType={type as ResourceType}></AllResourcesTable>
        </CustomLayout>

            </div>

    );
}

export default Resources;