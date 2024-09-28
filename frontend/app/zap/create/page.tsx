"use client";
import { BACKEND_URL } from "@/app/config";
import ActionNode from "@/components/Node/ActionTrigger";
import TriggerNode from "@/components/Node/TrigerNdoe";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { useEdgesState, useNodesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

// Define the node types mapping
const nodeTypes = {
  triggerNode: TriggerNode,
  actionNode: ActionNode,
};

// Initial set of nodes with one Trigger Node and one Action Node
const initialNodes = [
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
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      metadata: any;
    }[]
  >([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Function to add a new Action node based on custom fields
  const handleAddAction = (actionId: string, actionName: string, actionMetadata: Record<string, any>) => {
    const newNode = {
      id: `action-${nodes.length + 1}`,
      position: { x: 10, y: 100 },
      data: {
        label: `Action Node: ${actionName}`,
        availableActionId: actionId,
        availableActionName: actionName,
        metadata: actionMetadata,
      },
    };

    // Update the nodes state with the new Action node
    setNodes((nds) => [...nds, newNode]);

    // Update the selectedActions state
    setSelectedActions((actions) => [
      ...actions,
      {
        index: nodes.length + 1,
        availableActionId: actionId,
        availableActionName: actionName,
        metadata: actionMetadata,
      },
    ]);
  };

  // Handle connecting nodes
  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Publish button handler
  const handlePublish = async () => {
    if (!selectedTrigger?.id) {
      return; // Ensure a trigger is selected
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
          Authorization: localStorage.getItem("token"), // Use your authentication token
        },
      });
      
      console.log('Published successfully:', response.data);
      router.push("/dashboard");
    } catch (error) {
      console.error('Error publishing:', error);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <div className="flex justify-end bg-slate-200 p-4">
        <Button onClick={handlePublish}>Publish</Button>
      </div>

      {/* Render React Flow with Nodes and Edges */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: "#f0f0f0" }}
      />
    </div>
  );
}
