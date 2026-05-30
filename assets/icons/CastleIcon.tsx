import React from "react";
import Svg, { Path, G } from "react-native-svg";

const CastleIcon = ({ size = 24, color = "#c9a24d", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <G>
        <Path
          d="M25.552 0.712v4.227h-2.952v-4.227h-4.847v4.227h-2.915v-4.227h-4.847v4.227h-2.915v-4.227l-4.847-0v7.070l4.154 3.936v11.516c2.234 2.908 5.459 5.577 9.876 8.127 4.515-2.607 7.76-5.396 9.985-8.345v-11.297l4.154-3.936v-7.070h-4.847zM16.332 17.095h-7.070v-6.799l-2.915-2.733h9.985v9.532zM23.365 21.775c-1.557 2.065-3.859 4.038-6.997 5.867v-10.474h6.997v4.607z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default CastleIcon;