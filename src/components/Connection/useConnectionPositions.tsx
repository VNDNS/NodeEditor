import { useEffect, useRef, useState } from 'react';
import { useNodeEditor } from '../../context/NodeEditorContext';

const getRelativePosition = (element: HTMLElement, workspace: HTMLElement) => {
  const elementRect = element.getBoundingClientRect();
  const workspaceRect = workspace.getBoundingClientRect();

  return {
    x: elementRect.left - workspaceRect.left + elementRect.width / 2,
    y: elementRect.top - workspaceRect.top + elementRect.height / 2,
  };
};

export const useConnectionPositions = (source: string, target: string) => {
  const workspaceRef = useRef<HTMLElement | null>(null);
  const sourceRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const { state } = useNodeEditor();

  const [sourcePosition, setSourcePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    workspaceRef.current = document.querySelector('.workspace');
    sourceRef.current = document.getElementById(source);
    targetRef.current = document.getElementById(target);

    setSourcePosition(getRelativePosition(sourceRef.current, workspaceRef.current));
    setTargetPosition(getRelativePosition(targetRef.current, workspaceRef.current));
  }, [state.nodes, source, target]);

  return { sourcePosition, targetPosition };
};
