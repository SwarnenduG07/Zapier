import React, { useState } from 'react';

// Assuming useAvailableActionsAndTriggers is a custom hook that returns available actions and triggers
const useAvailableActionsAndTriggers = () => {
  // Mocking the data here; replace with your actual hook logic
  return {
    availableActions: [
      { id: '1', name: 'Action 1' },
      { id: '2', name: 'Action 2' },
    ],
    availableTriggers: [
      { id: '1', name: 'Email Received' },
      { id: '2', name: 'File Uploaded' },
      { id: '3', name: 'New Task Created' },
      { id: '4', name: 'Form Submission' },
    ],
  };
};

const TriggerNode = ({ data }) => {
  const { availableTriggers } = useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{ id: string; name: string } | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const trigger = availableTriggers.find((t) => t.id === selectedId);
    setSelectedTrigger(trigger || undefined);
    
    // Notify the parent component about the selected trigger
    if (data.onTriggerChange) {
      data.onTriggerChange(trigger);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
      <label className="block text-sm font-medium text-gray-700">Select Trigger</label>
      <select
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedTrigger ? selectedTrigger.id : ''}
        onChange={handleChange}
      >
        <option value="" disabled>Select a trigger</option>
        {availableTriggers.map((trigger) => (
          <option key={trigger.id} value={trigger.id}>
            {trigger.name}
          </option>
        ))}
      </select>

      {/* Display Selected Trigger */}
      {selectedTrigger && (
        <div className="mt-4 p-2 border border-indigo-500 rounded-md bg-indigo-50">
          <p className="text-sm text-indigo-700 font-semibold">Selected Trigger:</p>
          <p className="text-lg text-indigo-800">{selectedTrigger.name}</p>
        </div>
      )}
    </div>
  );
};

export default TriggerNode;
