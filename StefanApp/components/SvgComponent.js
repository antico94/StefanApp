import * as React from "react"
import Svg, {Path, LinearGradient, Stop} from "react-native-svg"

const SvgComponent = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1130.4 801.8"
        xmlSpace="preserve"
        {...props}
    >
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={props.startColor}/>
            <Stop offset="100%" stopColor={props.stopColor}/>
        </LinearGradient>
        <Path
            fill="url(#gradient)"
            d="M1078.5 57c-11.8-12.5-26.1-23.3-43.2-31.9C926.3-29.4 778 18.4 666.5 41c-146.8 29.7-292.8 80.9-417.6 165.2-102.7 69.2-366.8 255.5-188.8 389.7 40.3 30.4 91.3 42.1 140.7 52.7 201.5 43.2 405.4 73.7 605.8 121.2 79.3 18.8 167 60.4 240 2 95.8-76.7 46.3-257 63.6-363.8 17.2-106 47.3-267.4-31.7-351z"
        />
    </Svg>
)

export default SvgComponent
