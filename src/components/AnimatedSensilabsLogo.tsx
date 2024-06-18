import sensilabsLogo from '../assets/Login/SensilabsLogo.png'

type AnimationProps = {
    positionX: number
    positionY: number
    size: number
}

const  AnimatedSensilabsLogo = (props: AnimationProps) => {

    const  animationStyle = `
@keyframes rotate {
  0%{
    transform: rotate(0deg); filter: blur(0px);;
  }
  50% {
    transform: rotate(180deg); filter: blur(1px);
  }
  100%{
  transform: rotate(360deg); filter: blur(0px);;
  }
}
`;


    return (<div>
            <style>{animationStyle}</style>
            <div
                style={{
                    animation: 'rotate',
                    animationDuration: "5s",
                    animationIterationCount: "infinite",
                    position: "absolute",
                    top: props.positionY,
                    left: props.positionX,
                    float:"left"
                }}
            >
                <img
                    src={sensilabsLogo}
                    height={90*props.size}
                    width={90*props.size}
                    alt={"Sensilabs logo"}

                />
            </div>
        </div>
    );

}

export default AnimatedSensilabsLogo;