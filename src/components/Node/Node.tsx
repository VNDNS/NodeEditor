import React, { useCallback, useEffect, useState } from 'react';
import styles from './Node.module.scss';
import { NodeProps } from '../../types';
import {ActionTypes, useNodeEditor} from '../../context/NodeEditorContext'

const useDraggable = (id: string) => {
  const {state, dispatch} = useNodeEditor()
  const position = state.nodes.find(node => node.id === id)?.position
  const initialPosition = {x:100,y:100}
  const [dragging, setDragging] = useState(false);
  // const [position, setPosition] = useState(initialPosition);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    setDragging(true);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragging) return;

    const { movementX, movementY } = event;
    const delta = {x: movementX, y: movementY}
    // setPosition((prev) => ({ x: prev.x + movementX, y: prev.y + movementY }));
    dispatch({type: 'UPDATE_POSITION', payload: {id, delta }})
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);



  return { position, handleMouseDown };
};

export const Node: React.FC<NodeProps> = ({ id, title='node', inputs=2, outputs=1 }) => {

  const {dispatch} = useNodeEditor()
  const {position, handleMouseDown} = useDraggable(id)

  const handlePortClick = (portId: string, isInput: boolean) => {
    const actionType = isInput ? ActionTypes.COMPLETE_CONNECTION : ActionTypes.INITIATE_CONNECTION;
    dispatch({ type: actionType, payload: { portId, isInput } });
  };


  useEffect(() => {
    console.log(position);
    
  }, [position])


  return (
    <div
      className={styles.node}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div  className={styles.title}>{title}</div>
      <div className={styles.inputs}>
        {Array.from({ length: inputs }).map((_, i) => {
            const portId = `${id}-input-${i}`;
            return (
              <div
                key={portId}
                className={styles.port}
                id={portId}
                data-port-type="input"
                onClick={() => handlePortClick(portId, true)}
              />
            );
          })}
      </div>
      <div className={styles.outputs}>
        {Array.from({ length: outputs }).map((_, i) => {
            const portId = `${id}-output-${i}`;
            return (
              <div
                key={portId}
                className={styles.port}
                id={portId}
                data-port-type="output"
                onClick={() => handlePortClick(portId, false)}
              />
            );
          })}
      </div>
    </div>
  );
};


