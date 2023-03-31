import React from 'react';
import  Workspace  from '../Workspace/Workspace';
import styles from './App.module.scss';
import { NodeEditorProvider } from '../../context/NodeEditorContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddNodeButton from './AddNode';


const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <NodeEditorProvider>
        <DndProvider backend={HTML5Backend}>
          <AddNodeButton />
          <Workspace />
        </DndProvider>
      </NodeEditorProvider>
    </div>
  );
};

export default App;
