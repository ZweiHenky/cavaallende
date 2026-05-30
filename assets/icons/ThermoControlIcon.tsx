import React from "react";
import Svg, { Circle, Line, Path, Polyline } from "react-native-svg";

const ThermoControlIcon = ({
  size = 24,
  color = "#c9a24d",
  strokeWidth = 1.91,
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle
        cx="6.27"
        cy="17.73"
        r="0.95"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      <Path
        d="M9.14 13.93V4.36A2.87 2.87 0 0 0 6.27 1.5A2.86 2.86 0 0 0 3.41 4.36v9.57a4.78 4.78 0 1 0 5.73 0Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
      />

      <Line
        x1="6.27"
        y1="12"
        x2="6.27"
        y2="16.77"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Line
        x1="17.73"
        y1="8.18"
        x2="17.73"
        y2="13.91"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Polyline
        points="19.64 6.27 17.73 8.18 15.82 6.27"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Polyline
        points="15.82 15.82 17.73 13.91 19.64 15.82"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Line
        x1="20.59"
        y1="11.05"
        x2="14.86"
        y2="11.05"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Polyline
        points="22.5 12.96 20.59 11.04 22.5 9.14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Polyline
        points="12.96 9.14 14.86 11.04 12.96 12.96"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Circle
        cx="17.73"
        cy="11.05"
        r="0.95"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default ThermoControlIcon;