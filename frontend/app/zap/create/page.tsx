"use client"
import { BACKEND_URL } from "@/app/config";
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ZapCell } from "@/components/ZapCell";
import { useAvailableActionsAndTriggers } from "@/hooks/useactionTrigger";
import { Zap } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function() {
    const router = useRouter();
    const {availableActions, availableTriggers} = useAvailableActionsAndTriggers();
    const [selectedTrigger, setselectedTrigger] = useState<{id:string,
        name: string,
    }>();
    const [selectedActions, setselectedActions] = useState<{
        index: number;
        availableActionsId: string;
        availableActionsName: string;
    }[]>([]);
    const [selectedModalindex, setselectedModalindex] = useState<null | number>(null);
    return <div>
        <NavBar />
        <div className="flex justify-end bg-slate-200 pt-4">
           <Button className="w-44 bg-orange-600" onClick={ async() => {
               if (!selectedTrigger?.id) {
                return;
            }

            const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                "availableTriggerId": selectedTrigger.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionsId,
                    actionMetadata: {}
                }))
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            
            router.push("/dashboard");

           }}>
               Publish
           </Button>
        </div>
        <div className="w-full bg-slate-400 min-h-screen flex flex-col justify-center">
            <div className="flex justify-center w-full">
            <ZapCell name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1}  onClick={() => {
                setselectedModalindex(1);
            }}/>
            </div>
            <div className="justify-center w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="flex justify-center pt-2"><ZapCell name={action.availableActionsName ? action.availableActionsName : "Action"} index={action.index} onClick={() => {setselectedModalindex(action.index)}}/> </div>)}
            </div>
            <div className="flex justify-center">
                <Button className="w-20 flex justify-center bg-orange-600"  
                onClick={() => [
                    setselectedActions(a => [...a, {
                        index: a.length +2,
                        availableActionsId: "",
                        availableActionsName: ""
                    }])
                ]}>+</Button>
            </div>
        </div>
        {selectedModalindex && <Modal availableItems={selectedModalindex === 1 ? availableTriggers : availableActions} onSelect={( props: null |{name: string, id: string}) => {
            if (props === null) {
              setselectedModalindex(null)
              return;
            }
             if (selectedModalindex === 1 ) {
                 setselectedTrigger({
                    id: props.id,
                    name: props.name,
                 })
             } else {
                setselectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModalindex -2] = {
                        index: selectedModalindex,
                        availableActionsId:  props.id,
                        availableActionsName: props.name,
                    }
                    return newActions
                })
             }
             setselectedModalindex(null)
        }} index={selectedModalindex} />}
    </div>
} 

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; }) => void, availableItems: {id: string, name: string, image: string;}[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

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
                    {availableItems.map(({id, name, image}) => {
                        return <div  onClick={() => {
                            onSelect({
                                id,
                                name,
                            })
                        }} className="flex border p-4 cursor-pointer hover:bg-slate-400">
                             <img src={image} width={30} alt="Image" className="rounded-full"/> <div className="flex-col justify-center">{name}</div>
                        </div>
                    })}  
                </div>
            </div>
        </div>
    </div>

}
