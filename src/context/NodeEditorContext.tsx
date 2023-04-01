import { createContext, useContext, useReducer } from "react";
import { ConnectionProps, NodeProps, NodeEditorState } from "../types";
import { v4 as uuidv4 } from 'uuid';


type NodeEditorProviderProps = {
  children: React.ReactNode;
};

const initialState: NodeEditorState = {
  currentConnection: null,
  nodes: [],
  connections: [],
};

export const NodeEditorContext = createContext<{
  state: NodeEditorState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export enum ActionTypes {
  ADD_NODE = "ADD_NODE",
  UPDATE_NODE = "UPDATE_NODE",
  DELETE_NODE = "DELETE_NODE",
  ADD_CONNECTION = "ADD_CONNECTION",
  DELETE_CONNECTION = "DELETE_CONNECTION",
  INITIATE_CONNECTION = "INITIATE_CONNECTION",
  COMPLETE_CONNECTION = "COMPLETE_CONNECTION",
  UPDATE_POSITION = "UPDATE_POSITION",
}

type Action =
  | { type: ActionTypes.ADD_NODE; payload: NodeProps }
  | { type: ActionTypes.UPDATE_NODE; payload: NodeProps }
  | { type: ActionTypes.DELETE_NODE; payload: { id: string } }
  | { type: ActionTypes.INITIATE_CONNECTION; payload: { portId: string; isInput: boolean }}
  | { type: ActionTypes.COMPLETE_CONNECTION; payload: { portId: string; isInput: boolean }}
  | { type: ActionTypes.UPDATE_POSITION; payload: { id: string; position: { x: number; y: number } } }

const nodeEditorReducer = (state: NodeEditorState, action: Action): NodeEditorState => {
  switch (action.type) {
    case ActionTypes.ADD_NODE:
      return { ...state, nodes: [...state.nodes, action.payload] };
    
    case ActionTypes.DELETE_NODE:
      return {
        ...state,
        nodes: state.nodes.filter((node) => node.id !== action.payload.id),
        connections: state.connections.filter(
          (connection) => connection.source !== action.payload.id && connection.target !== action.payload.id
        ),
      };

    case ActionTypes.UPDATE_NODE:
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === action.payload.id) {

            node.position.x += action.payload.x
            node.position.y += action.payload.y

            return node;
          }
          return node;
        }),
      };

    case ActionTypes.INITIATE_CONNECTION:
      console.log('initiate connection');
      
      return { ...state, currentConnection: { id: null, source: action.payload.portId, target: null } };
    
    case ActionTypes.COMPLETE_CONNECTION:
      console.log('complete connection');

      if (!state.currentConnection || !action.payload.isInput) {
        return state;
      }
      const newConnection = { id: uuidv4(), source: state.currentConnection.source, target: action.payload.portId };
      console.log('ahoi');
      
      return { ...state, connections: [...state.connections, newConnection], currentConnection: null };

    case ActionTypes.UPDATE_POSITION:
        console.log('update position');
        
        return {
          ...state,
          nodePosition: {
            ...state.nodePosition,
            [action.payload.id]: action.payload.position,
          },
        };

    default:
      return state;
  }
};

export const NodeEditorProvider: React.FC<NodeEditorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(nodeEditorReducer, initialState);

  return (
    <NodeEditorContext.Provider value={{ state, dispatch }}>
      {children}
    </NodeEditorContext.Provider>
  );
};

export const useNodeEditor = () => {
  const context = useContext(NodeEditorContext);
  if (context === undefined) {
    throw new Error("useNodeEditor must be used within a NodeEditorProvider");
  }
  return context;
};

