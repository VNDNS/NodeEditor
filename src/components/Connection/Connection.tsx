// components/Connection/Connection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ConnectionProps } from '../../types';
import styles from './Connection.module.scss';
import { useNodeEditor } from '../../context/NodeEditorContext';
import { useConnectionPositions } from './useConnectionPositions';

const Connection: React.FC<ConnectionProps> = ({ source, target }) => {
  
  const { sourcePosition, targetPosition } = useConnectionPositions(source, target);

  const pathData = `M ${sourcePosition.x} ${sourcePosition.y} L ${targetPosition.x} ${targetPosition.y}`;

  return (
    <svg className={styles.connection}>
      <path d={pathData} stroke="lime" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default Connection;


