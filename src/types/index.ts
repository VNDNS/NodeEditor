export interface NodeProps {
  id: string;
  type: string;
  position: Point;
  title?: string;
  inputs?: number;
  outputs?: number;
}

export interface NodeEditorState {
  currentConnection: ConnectionProps | null
  nodes: NodeProps[];
  connections: ConnectionProps[];
}

export interface Point {
  x: number,
  y: number
}

export interface ConnectionProps {
  id: string;
  source: string;
  target: string;
}

export interface Item {
  id: string
  x: number
  y: number
}