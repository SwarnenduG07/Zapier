import React, { useState } from "react";
import { Handle, Position } from "reactflow"; 
import { useAvailableActionsAndTriggers } from "@/hooks/useactionTrigger";

const TriggerNode = ({ data }: { data: any }) => {
  const { availableTriggers } = useAvailableActionsAndTriggers();
  const { setSelectedTrigger } = data; 

  const [selectedTrigger, setLocalSelectedTrigger] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectTrigger = (trigger : any) => {
   
    setLocalSelectedTrigger(trigger);
    setSelectedTrigger(trigger); 
    setIsModalVisible(false);
  };

  return (
    <div className="bg-[#2d1f00] border border-dotted border-[#e6b800] rounded-lg p-4 shadow-lg text-white w-80 relative hover:border-emerald-600 hover:border-spacing-7">
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output"
        className="rounded-full border border-emerald-600 py-1 px-1"
      />

      {/* Trigger Button with Icon */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-gray-500">⚡</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded-md"
          onClick={() => setIsModalVisible(true)}
        >
          {selectedTrigger ? selectedTrigger.name : "Select Trigger"}
        </button>
      </div>

      <p className="text-sm">
        <strong>1.</strong> Select the event that starts your Zap.
      </p>

      {/* Modal for selecting Trigger */}
      {isModalVisible && (
        <TriggerModal
          availableTriggers={availableTriggers.map(trigger => ({
            id: trigger.id.toString(),
            name: trigger.name,
            image: trigger.image
          }))}
          onClose={() => setIsModalVisible(false)}
          onSelectTrigger={handleSelectTrigger} 
        />
      )}
    </div>
  );
};

function TriggerModal({
  availableTriggers,
  onClose,
  onSelectTrigger,
}: {
  availableTriggers: { id: string; name: string; image: string }[];
  onClose: () => void;
  onSelectTrigger: (trigger: { id: string; name: string }) => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Select Trigger</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-2">
          {availableTriggers.map((trigger) => (
            <div
              key={trigger.id}
              onClick={() => onSelectTrigger(trigger)}
              className="flex items-center p-2 border border-red-800 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <img src={trigger.image} alt={trigger.name} className="w-8 h-8 rounded-full mr-4 " />
              <span className="text-black">{trigger.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TriggerNode;
