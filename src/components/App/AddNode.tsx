import React from 'react';
import { NodeProps } from '../../types';
// import { addNode } from '../../context/NodeEditorContext';
import { useNodeEditor } from '../../context/NodeEditorContext';
import { v4 as uuidv4 } from 'uuid';

const AddNodeButton: React.FC = () => {

  const { dispatch } = useNodeEditor();
  
  const handleAddNode = () => {
    const newNode: NodeProps = {
      id: uuidv4(),
      type: 'node',
      position: { x: 100, y: 100 }
    }
    dispatch({ type: 'ADD_NODE', payload: newNode });
  };

  return <button onClick={handleAddNode}>Add Node</button>;
};

export default AddNodeButton;