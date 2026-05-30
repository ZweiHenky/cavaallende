import React from "react";
import Svg, { Path } from "react-native-svg";

const CalendarIcon = ({ size = 24, color = "#c9a24d", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M3 9H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M7 3V5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M17 3V5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M6 12H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M11 12H13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M16 12H18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M6 15H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M11 15H13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M16 15H18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M6 18H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M11 18H13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M16 18H18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      <Path
        d="M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CalendarIcon;