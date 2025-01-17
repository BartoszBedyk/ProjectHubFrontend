import React from 'react';
import {api} from "../../api/AppApi";
import {Button, Icon} from "@mui/material";
import { DownloadSharp} from "@mui/icons-material";
import {useTranslation} from "react-i18next";


interface DownloadFileButtonProps {
    children : string;
}

export const DownloadFileButton = ({ children }: DownloadFileButtonProps) => {
    const {t} = useTranslation("buttons");
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        const downloadFile = async (children: string) => {

            api.attachment.download(children)
                .then(response => {
                    const blob = new Blob([response.data], {
                        type: response.data.type,
                    });

                    const disposition = response.headers['content-disposition'];
                    let filename = "tenyoutenge"
                    if (disposition && disposition.includes('attachment')) {
                        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        const matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) {
                            filename = matches[1].replace(/['"]/g, '');
                        }
                    }

                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                })
                .catch(error => {
                    console.error('Error occurred while downloading file:', error);
                });

        }
        downloadFile(children).then(() => {
            //console.log("file_downloaded")
        });


    }
    return (
        <form onSubmit={handleSubmit}>
            <Button
                size="medium"
                type="submit"
                title={t("downloadAttachment")}
            >
                <Icon style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DownloadSharp/>
                </Icon>
            </Button>
        </form>
    )


}





