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


    return (<span style={{zIndex:"-1"}}>
            <style>{animationStyle}</style>
            <div
                style={{
                    animation: 'rotate',
                    animationDuration: "10s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                    position: "fixed",
                    top: `${props.positionY}vh`,
                    left: `${props.positionX}vw`,


                }}
            >
                <img
                    src={sensilabsLogo}
                    height={90*props.size}
                    width={90*props.size}
                    alt={"Sensilabs logo"}

                />
            </div>
        </span>
    );

}

export default AnimatedSensilabsLogo;