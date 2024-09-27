import React, { useState } from "react";
import { Handle } from "reactflow"; // Import Handle from React Flow
import { useAvailableActionsAndTriggers } from "@/hooks/useactionTrigger";
import { Button } from "@/components/ui/button"; // Assuming you have this Button component
import { Input } from "../Input";

const ActionNode = () => {
  const { availableActions } = useAvailableActionsAndTriggers();
  const [selectedAction, setSelectedAction] = useState<{ id: string; name: string } | null>(null);
  const [step, setStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [metadata, setMetadata] = useState({}); // Metadata state to store email or solana data

  return (
    <div className="bg-[#1f2d00] border border-dotted border-[#b8e600] rounded-lg p-4 shadow-lg text-white w-80 relative">
      {/* Input Handle positioned at the top of the node */}
      <Handle
        type="target"
        position="top"
        id="input"
        style={{ background: "#555", top: -10 }}
      />

      {/* Action Button with Icon */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-green-500">⚙️</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded-md"
          onClick={() => setIsModalVisible(true)}
        >
          {selectedAction ? selectedAction.name : "Select Action"}
        </button>
      </div>
      <p className="text-sm">
        <strong>2.</strong> Choose the action to be performed.
      </p>

      {/* Conditionally render the selector based on selected action */}
      {selectedAction?.name === "Email" && (
        <EmailSelector setMetadata={setMetadata} />
      )}
      {selectedAction?.name === "Solana" && (
        <SolanaSelector setMetadata={setMetadata} />
      )}

      {/* Modal for selecting Action */}
      {isModalVisible && (
        <ActionModal
          availableActions={availableActions}
          onClose={() => setIsModalVisible(false)}
          onSelectAction={(action) => {
            setSelectedAction(action); // Set the selected action when clicked
            setIsModalVisible(false); // Close the modal after selecting
          }}
        />
      )}
    </div>
  );
};

// Modal Component for Action Selection
function ActionModal({
  availableActions,
  onClose,
  onSelectAction,
}: {
  availableActions: { id: string; name: string; image: string }[];
  onClose: () => void;
  onSelectAction: (action: { id: string; name: string }) => void;
}) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <div className="text-xl">Select Action</div>
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
          {/* Modal Body: List of Actions */}
          <div className="p-4 space-y-4">
            {availableActions.map(({ id, name, image }) => (
              <div
                key={id}
                onClick={() => onSelectAction({ id, name })}
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


function EmailSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return <div>
        <Input label={"To"} type={"text"} placeholder="To" onChange={(e) => setEmail(e.target.value)}></Input>
        <Input label={"Body"} type={"text"} placeholder="Body" onChange={(e) => setBody(e.target.value)}></Input>
        <div className="pt-2">
            <Button onClick={() => {
                setMetadata({
                    email,
                    body
                })
            }}>Submit</Button>
        </div>
    </div>
}

function SolanaSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");    

    return <div>
        <Input label={"To"} type={"text"} placeholder="To" onChange={(e) => setAddress(e.target.value)}></Input>
        <Input label={"Amount"} type={"text"} placeholder="To" onChange={(e) => setAmount(e.target.value)}></Input>
        <div className="pt-4">
        <Button onClick={() => {
            setMetadata({
                amount,
                address
            })
        }}>Submit</Button>
        </div>
    </div>
}
export default ActionNode;
