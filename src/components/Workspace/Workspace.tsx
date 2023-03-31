import { Node } from '../Node/Node';
import React, { useContext } from 'react';
import { useDroppableWorkspace } from '../../hooks/useDragAndDrop';
import {NodeEditorContext} from '../../context/NodeEditorContext';
import { Item } from '../../types';
// import styles from './Workspace.module.scss';
import './Workspace.scss'
import Connection from '../Connection/Connection';

const Workspace: React.FC = () => {
  const { state, dispatch } = useContext(NodeEditorContext);
  const { nodes, connections } = state;

  const updateNodePosition = (item: Item) => {
    dispatch({ type: 'UPDATE_NODE', payload: item });
  };

  const drop = useDroppableWorkspace((item: Item) => {
    updateNodePosition(item);
  });


  return (
      <div ref={drop} className='workspace'>
          {nodes.map((node) => (
            <Node key={node.id} {...node} />
          ))}
          <svg>
          {connections.map((connection) => (
            <Connection key={connection.id} {...connection} />
          ))}
          </svg>
      </div>
    );
  };
  
  export default Workspace;