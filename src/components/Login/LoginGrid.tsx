import {Grid} from "@mui/material";
import AnimatedSensilabsLogo from "./AnimatedSensilabsLogo";


export const LoginGrid: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    return (
        <div>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                position="fixed"
                style={{ minHeight: '100vh', backgroundColor: '#f4f7fa' }}
            >
                <AnimatedSensilabsLogo positionX={54.3} positionY={10} size={1.5}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={38} positionY={65} size={2}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={54} positionY={40} size={2.5}></AnimatedSensilabsLogo>



                <AnimatedSensilabsLogo positionX={950} positionY={600} size={2}></AnimatedSensilabsLogo>





                <Grid >{children}</Grid>


            </Grid>

        </div>
    );
};
