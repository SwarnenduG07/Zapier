"use client"
import { BACKEND_URL } from "@/app/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import TriggerNode from "@/components/Node/TrigerNdoe";
import ActionNode from "@/components/Node/ActionTrigger";
import '@xyflow/react/dist/style.css';
import { Switch } from "@/components/ui/switch";
import { Node, NodeProps } from 'reactflow';

const gridSize = 20;


type NodeData = {
  label: string;
  setSelectedTrigger?: React.Dispatch<React.SetStateAction<{ id: string; name: string; } | null>>;
  setSelectedActions?: React.Dispatch<React.SetStateAction<{ index: number; availableActionId: string; availableActionName: string; metadata: any; }[]>>;
  selectedActions?: { index: number; availableActionId: string; availableActionName: string; metadata: any; }[];
};


const nodeTypes = {
  triggerNode: TriggerNode as React.FC<NodeProps<NodeData>>,
  actionNode: ActionNode as React.FC<NodeProps<NodeData>>,
};

const initialNodes: Node<NodeData>[] = [
  {
    id: "trigger-1",
    position: { x: 50, y: 50 },
    data: { label: "Trigger Node" },
    type: "triggerNode",
  },
  {
    id: "action-1",
    position: { x: 50, y: 150 },
    data: { label: "Action Node" },
    type: "actionNode",
  },
];

const initialEdges = [{ id: "edge-1", source: "trigger-1", target: "action-1" }];

export default function App() {
  const router = useRouter();
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedActions, setSelectedActions] = useState<{
    index: number;
    availableActionId: string;
    availableActionName: string;
    metadata: any;
  }[]>([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle connecting nodes
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  
  const handlePublish = async () => {
    if (!selectedTrigger?.id) {
      alert("Please select a trigger before publishing.");
      return;
    }

    if (selectedActions.length === 0) {
      alert("Please select at least one action before publishing.");
      return;
    }

   
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
        availableTriggerId: selectedTrigger.id,
        triggerMetadata: {},
        actions: selectedActions.map((a) => ({
          availableActionId: a.availableActionId,
          actionMetadata: a.metadata,
        })),
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        alert("Error publishing the process. Please try again.");
      }
    } catch (error) {
      console.error("Error during publishing:", error);
      alert("Error publishing the process. Please try again.");
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827'; 
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff'; 
    }
  }, [isDarkMode]);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center md:mx-28 mx-12 mt-3 p-1.5 rounded-2xl bg-gradient-to-bl from-20% from-neutral-200  to-neutral-400 dark:from-neutral-700 dark:to-neutral-900  backdrop-blur-xl">
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
          />
          
          <Button 
            onClick={handlePublish} 
            className="text-clip bg-transparent  bg-gradient-to-r from-neutral-800 to-zinc-900 border border-neutral-800 dark:from-purple-800 dark:to-purple-800 dark:text-neutral-100 mr-1.5 rounded-full w-18 h-9"
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes.map((node) => {
            if (node.type === "triggerNode") {
              return {
                ...node,
                data: { ...node.data, setSelectedTrigger },
              };
            } else if (node.type === "actionNode") {
              return {
                ...node,
                data: {
                  ...node.data,
                  setSelectedActions,
                  selectedActions,
                }
              }
            }
            return node;
          })}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-white dark:bg-gray-900 transition-colors duration-200"
          snapGrid={[gridSize, gridSize]}
        >
          <Background />
          <Controls />
          <div className="bg-red-600">
            <MiniMap/>
          </div>
        </ReactFlow>
      </div>
    </div>
  );
}
