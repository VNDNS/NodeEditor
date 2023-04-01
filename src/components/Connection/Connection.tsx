// components/Connection/Connection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ConnectionProps } from '../../types';
import styles from './Connection.module.scss';
import { useNodeEditor } from '../../context/NodeEditorContext';

// components/Connection/Connection.tsx
const getRelativePosition = (element: HTMLElement, workspace: HTMLElement) => {
  const elementRect = element.getBoundingClientRect();
  const workspaceRect = workspace.getBoundingClientRect();

  return {
    x: elementRect.left - workspaceRect.left + elementRect.width / 2,
    y: elementRect.top - workspaceRect.top + elementRect.height / 2,
  };
};


const Connection: React.FC<ConnectionProps> = ({ id, source, target }) => {
  
  const workspaceRef = useRef<HTMLElement | null>(null);
  const sourceRef    = useRef<HTMLElement | null>(null);
  const targetRef    = useRef<HTMLElement | null>(null);
  const { state } = useNodeEditor();
  
  const [sourcePosition, setSourcePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    workspaceRef.current = document.querySelector('.workspace');
    sourceRef.current = document.getElementById(source);
    targetRef.current = document.getElementById(target);
  
    setSourcePosition(getRelativePosition(sourceRef.current, workspaceRef.current))
    setTargetPosition(getRelativePosition(targetRef.current, workspaceRef.current))
  
  }, [state.nodePosition]);


  console.log('render connection');
  
  

  // Generate a path for the connection line (use the calculated positions)
  const pathData = `M ${sourcePosition.x} ${sourcePosition.y} L ${targetPosition.x} ${targetPosition.y}`;

  return (
    <svg className={styles.connection}>
      <path d={pathData} stroke="lime" strokeWidth="2" fill="none" />
    </svg>
  );
};

export default Connection;


