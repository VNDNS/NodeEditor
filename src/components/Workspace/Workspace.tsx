import { Node } from '../Node/Node';
import React, { useContext } from 'react';
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

  return (
      <div  className='workspace'>
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