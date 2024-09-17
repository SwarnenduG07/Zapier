import { BACKEND_URL } from "@/app/config";
import { useEffect, useState } from "react";
import axios from "axios";

export interface AvailableAction {
    id: number;
    name: string;
    image: string;
  }
  
 export interface AvailableTrigger {
    id: number;
    name: string;
    image: string;
  }
  
export function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState<AvailableAction[]>([]);
    const [availableTriggers, setAvailableTriggers] = useState<AvailableTrigger[]>([]);

    useEffect(() => {
        axios.get<{availableTriggers: AvailableTrigger[]}>(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))

        
        axios.get<{ availableActions: AvailableAction[] }>(`${BACKEND_URL}/api/v1/action/available`)
        .then(x => setAvailableActions(x.data.availableActions))
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}