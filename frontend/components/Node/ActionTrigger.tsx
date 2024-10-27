import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { useAvailableActionsAndTriggers } from "@/hooks/useactionTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "../Input";
import { ZapCell } from "../ZapCell";

const ActionNode = ({ data }: { data: any }) => {
  const { availableActions } = useAvailableActionsAndTriggers();
  const {  selectedActions ,setSelectedActions } = data;

  const [selectedModelIndex, setSelectedModalIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#1f2d00] border border-dotted border-[#b8e600] rounded-lg p-4 shadow-lg text-white w-80 relative">
      <Handle
        type="target"
        position={Position.Top}
        id="input"
        className="rounded-full border border-emerald-600 py-1 px-1"
      />

      <div className="flex items-center space-x-2 mb-2">
        <span className="flex justify-center items-center w-6 h-6 rounded-full bg-green-500">⚙️</span>
        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action: any) => (
            <div key={action.index} className="pt-2 flex justify-center">
              <ZapCell
                onClick={() => setSelectedModalIndex(action.index)}
                name={action.availableActionName || "Action"}
                index={action.index}
              />
            </div>
          ))}
        </div>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded-md"
          onClick={() => setSelectedModalIndex(selectedActions.length + 1)}
        >
          Select Action
        </button>
      </div>



      <p className="text-sm">
        <strong>2.</strong> Choose the action to be performed.
      </p>

      {selectedModelIndex !== null && (
        <Modal
          availableItems={availableActions.map(action => ({
            id: action.id.toString(),
            name: action.name,
            image: action.image
          }))}
          onSelect={(props: null | { name: string; id: string; metadata: any }) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            const newAction = {
              index: selectedModelIndex,
              availableActionId: props.id,
              availableActionName: props.name,
              metadata: props.metadata,
            };
            setSelectedActions((prevActions: any) => {
              const newActions = [...prevActions];
              newActions[selectedModelIndex - 1] = newAction;
              return newActions;
            });
            setSelectedModalIndex(null);
          }}
          index={selectedModelIndex}
        />
      )}
    </div>
  );
};

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: {id: string, name: string, image: string;}[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();

    return <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <div className="text-xl">
                        Select {index === 1 ? "Trigger" : "Action"}
                    </div>
                    <button onClick={() => {
                        onSelect(null);
                    }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                    {step === 1 && selectedAction?.id === "email" && <EmailSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        })
                    }} />}

                    {(step === 1 && selectedAction?.id === "send-sol") && <SolanaSelector setMetadata={(metadata) => {
                        onSelect({
                            ...selectedAction,
                            metadata
                        })
                    }} />}

                    {step === 0 && <div>{availableItems.map(({id, name, image}) => {
                            return <div onClick={() => {
                                setStep(s => s + 1);
                                setSelectedAction({
                                    id,
                                    name
                                })
                            }} className="flex border p-4 cursor-pointer hover:bg-slate-100 border-red-800">
                                <img src={image} width={35} className="rounded-full" /> <div className="flex flex-col justify-center text-black ml-1.5"> {name} </div>
                            </div>
                        })}</div>}                    
                </div>
            </div>
        </div>
    </div>

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
        <Input label={"Amount"} type={"text"} placeholder="Amount" onChange={(e) => setAmount(e.target.value)}></Input>
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
