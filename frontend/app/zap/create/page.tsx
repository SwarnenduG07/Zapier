"use client"
import { BACKEND_URL } from "@/app/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import TriggerNode from "@/components/Node/TrigerNdoe";
import ActionNode from "@/components/Node/ActionTrigger";

// Define the node types mapping
const nodeTypes = {
  triggerNode: (props : any) => <TriggerNode {...props} setSelectedTrigger={props.setSelectedTrigger} />,
  actionNode: (props: any) => <ActionNode {...props} setSelectedActions={props.setSelectedActions} />,
};

// Initial set of nodes with one Trigger Node and one Action Node
const initialNodes = [
  {
    id: "trigger-1",
    position: { x: 50, y: 50 },
    data: { label: "Trigger Node", setSelectedTrigger: null }, // Add setSelectedTrigger to TriggerNode data
    type: "triggerNode",
  },
  {
    id: "action-1",
    position: { x: 50, y: 150 },
    data: { label: "Action Node" , setSelectedActions : null},
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

  // Handle Publish Button Click
  const handlePublish = async () => {
    if (!selectedTrigger?.id) {
      alert("Please select a trigger before publishing.");
      return;
    }

    if (selectedActions.length === 0) {
      alert("Please select at least one action before publishing.");
      return;
    }

    // Prepare the data for publishing
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
        alert("Process published successfully!");
        router.push("/dashboard");
      } else {
        alert("Error publishing the process. Please try again.");
      }
    } catch (error) {
      console.error("Error during publishing:", error);
      alert("Error publishing the process. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen relative ">
      <div className="flex justify-end bg-slate-700 p-4">
        <Button onClick={handlePublish}>Publish</Button> {/* Bind Publish Button to handlePublish function */}
      </div>

      {/* Render React Flow with Nodes and Edges */}
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
        className="bg-black"
      />
    </div>
  );
}
