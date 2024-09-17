import { BACKEND_URL } from "@/app/config";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

interface ZapsResponse {
  zaps: Zap[];
}

export function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios.get<ZapsResponse>(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
      .then(response => {
    
        setZaps(response.data.zaps);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching zaps:", error);
        setLoading(false);
      });
  }, []);

  return {
    loading, zaps,
  };
}
