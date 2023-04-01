import React from 'react';
import styles from './Node.module.scss';
import { NodeProps } from '../../types';
import {ActionTypes, useNodeEditor} from '../../context/NodeEditorContext'

export const Node: React.FC<NodeProps> = ({ id, position, title='node', inputs=2, outputs=1 }) => {

  const {dispatch} = useNodeEditor()

  const handlePortClick = (portId: string, isInput: boolean) => {
    const actionType = isInput ? ActionTypes.COMPLETE_CONNECTION : ActionTypes.INITIATE_CONNECTION;
    dispatch({ type: actionType, payload: { portId, isInput } });
  };

  return (
    <div
      className={styles.node}
      style={{ left: position.x, top: position.y }}
      draggable="true"
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


