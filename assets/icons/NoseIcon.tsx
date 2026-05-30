import React from "react";
import Svg, { G, Path } from "react-native-svg";

const NoseIcon = ({ size = 24, color = "#c9a24d", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G>
        <Path
          d="M7.23.52V6.73A4.25 4.25 0 0 1 6.37 9.3l-4 5.35a4.28 4.28 0 0 0-.86 2.58 4.29 4.29 0 0 0 4.3 4.29H9.14"
          stroke={color}
          strokeWidth={1.91}
          strokeMiterlimit={10}
          fill="none"
        />

        <Path
          d="M5.32 17.7h.43a3 3 0 0 1 2.91 2.39 3 3 0 0 0 2.91 2.39H12"
          stroke={color}
          strokeWidth={1.91}
          strokeMiterlimit={10}
          fill="none"
        />

        <Path
          d="M16.77.52V6.73a4.25 4.25 0 0 0 .86 2.57l4 5.35a4.28 4.28 0 0 1 .86 2.58 4.29 4.29 0 0 1-4.3 4.29H14.86"
          stroke={color}
          strokeWidth={1.91}
          strokeMiterlimit={10}
          fill="none"
        />

        <Path
          d="M18.68 17.7h-.43a3 3 0 0 0-2.91 2.39 3 3 0 0 1-2.91 2.39H12"
          stroke={color}
          strokeWidth={1.91}
          strokeMiterlimit={10}
          fill="none"
        />
      </G>
    </Svg>
  );
};

export default NoseIcon;