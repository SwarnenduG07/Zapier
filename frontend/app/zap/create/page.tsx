"use client"
import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { ZapCell } from "@/components/ZapCell";
import { Zap } from "lucide-react";
import { useState } from "react";

export default function() {
    const [selectedTrigger, setselectedTrigger] = useState("");
    const [selectedActions, setselectedActions] = useState<{
        availableActionsId: string;
        availableActionsName: string;
    }[]>([]);
    return <div>
        <NavBar />
        <div className="w-full bg-slate-400 min-h-screen flex flex-col justify-center">
            <div className="flex justify-center w-full">
            <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}  onClick={() => {}}/>
            </div>
            <div className="justify-center w-full pt-2 pb-2">
                {selectedActions.map((action, i) => <div className="flex justify-center pt-2"><ZapCell name={action.availableActionsName ? action.availableActionsName : "Action"} index={2 + i} onClick={() => {}}/> </div>)}
            </div>
            <div className="flex justify-center">
                <Button className="w-20 flex justify-center bg-orange-600"  
                onClick={() => [
                    setselectedActions(a => [...a, {
                        availableActionsId: "",
                        availableActionsName: ""
                    }])
                ]}>+</Button>
            </div>
        </div>
    </div>
} 