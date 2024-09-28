import React, { useState } from "react";
import { Handle } from "reactflow"; // Import Handle from React Flow
import { useAvailableActionsAndTriggers } from "@/hooks/useactionTrigger";
import { ZapCell } from "@/components/ZapCell"; // Adjust if necessary
import { Button } from "@/components/ui/button"; // Assuming you have this Button component

const TriggerNode = () => {
  // Fetch available triggers and actions
  const { availableTriggers } = useAvailableActionsAndTriggers();

  // State for selected trigger
  const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string }>();

  // State to control the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="bg-[#2d1f00] border border-dotted border-[#e6b800] rounded-lg p-4 shadow-lg text-white w-80 relative">
      {/* Output Handle positioned at the bottom of the node */}
      <Handle
        type="source" // This handle acts as the output connector
        position="bottom" // Position handle at the bottom of the node
        id="output" // Unique ID for the handle
        style={{ background: "#555", bottom: -10 }} // Adjust style and positioning if needed
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
          availableTriggers={availableTriggers}
          onClose={() => setIsModalVisible(false)}
          onSelectTrigger={(trigger) => {
            setSelectedTrigger(trigger);
            setIsModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

// Modal Component for Trigger Selection
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
    <div className="">
      <div >
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <div className="text-xl">Select Trigger</div>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body: List of Triggers */}
          <div className="p-4 space-y-4">
            {availableTriggers.map(({ id, name, image }) => (
              <div
                key={id}
                onClick={() => onSelectTrigger({ id, name })}
                className="flex border p-4 cursor-pointer bg-zinc-200 text-black hover:bg-slate-300 items-center"
              >
                <img src={image} width={30} className="rounded-full mr-4" alt={name} />
                <div>{name}</div>
              </div>
            ))}
          </div>

          {/* Modal Footer (optional) */}
          <div className="flex justify-end p-4 border-t">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TriggerNode;
