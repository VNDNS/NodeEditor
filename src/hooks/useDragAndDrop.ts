import { useDrag, useDrop } from 'react-dnd';
import { NodeProps } from '../types';

export function useDraggableNode(id: string) {
  const [, drag] = useDrag(() => {
      return {type: 'node', item: { id, x:0, y:0 }}
    }
  )

  return drag;
}

export function useDroppableWorkspace(onDrop: (item: {id: string, x: number, y: number}) => void) {
  
  const [, drop] = useDrop(() => ({
    accept: 'node',
    drop: (item: {id: string, x: number, y: number}, monitor) => {
      
      const delta = monitor.getDifferenceFromInitialOffset();
      item.x = delta.x
      item.y = delta.y
      
      onDrop(item);
    },
  }));

  return drop;
}
