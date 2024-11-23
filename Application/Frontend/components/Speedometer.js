// Speedometer.js
import React from 'react';
import { View } from 'react-native';
import { Svg, Circle, Path, Text as SvgText } from 'react-native-svg';

const Speedometer = ({ value, maxValue, label }) => {
  const radius = 90;
  const strokeWidth = 20;
  const center = 100;
  const endAngle = ((value / maxValue) * Math.PI) - Math.PI / 2;
  const x1 = center + radius * Math.cos(-Math.PI / 2);
  const y1 = center + radius * Math.sin(-Math.PI / 2);
  const x2 = center + radius * Math.cos(endAngle);
  const y2 = center + radius * Math.sin(endAngle);

  return (
    <View style={{ alignItems: 'center', margin: 16 }}>
      <Svg height="200" width="200">
        {/* Background Circle */}
        <Circle cx={center} cy={center} r={radius} stroke="#489ff6" strokeWidth={strokeWidth} fill="none" />
        
        {/* Foreground Arc */}
        <Path
          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${value > maxValue / 2 ? 1 : 0} 1 ${x2} ${y2}`}
          stroke="green"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Value Text */}
        <SvgText
          x={center}
          y={center}
          textAnchor="middle"
          fontSize="30"
          fontWeight="bold"
          fill="#333"
        >
          {value}
        </SvgText>
        
        {/* Label Text */}
        <SvgText
          x={center}
          y={center + 20}
          textAnchor="middle"
          fontSize="16"
          fill="#666"
        >
          {label}
        </SvgText>
      </Svg>
    </View>
  );
};

export default Speedometer;
