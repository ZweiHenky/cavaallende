import React from "react";
import Svg, { Path } from "react-native-svg";

const CubeNetworkIcon = ({ size = 24, color = "#c9a24d", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 -0.5 25 25"
      fill="none"
      {...props}
    >
      <Path
        d="M12 19L19 16.2V10.379L14.5 12.5L12 10.6V19Z"
        fill={color}
      />

      <Path
        d="M12 19L5 16.2V10.379L9.5 12.5L12 10.6V19Z"
        fill={color}
      />

      <Path
        d="M12 10.6L19 7.8L12 5L5 7.8L12 10.6Z"
        fill={color}
      />

      <Path
        d="M19 7.8L21.5 9.2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      <Path
        d="M5 7.8L2.5 9.2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      <Path
        d="M14.5 12.5L19 10.379"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M9.5 12.5L5 10.379"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CubeNetworkIcon;