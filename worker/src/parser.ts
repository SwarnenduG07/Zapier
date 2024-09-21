export function Parse(text: string,values: any ,startDelimeter = "{", endDelimeter = "}") {
    let startIndex = 0;
    let endIndex =  1;
 
     let finalString  = "";
    while (endIndex < text.length) {
        if(text[startIndex] === startDelimeter)  {
            let endPoint = startIndex + 2;
            while (text[endPoint] !== endDelimeter) {
                endPoint++;
            }
            let strigHoldingValue = text.slice(startIndex +1, endPoint);
            const key = strigHoldingValue.split(".");
            let localValue =  {
                ...values
            }
            for (let i = 0; i< key.length; i++) {
                if(typeof localValue == "string") {
                    localValue = JSON.parse(localValue)
                }
                localValue = localValue[key[i]];
            }
            finalString += localValue;
            startIndex = endPoint + 1;
            endIndex = endIndex +2;
        } else {
            finalString += text[startIndex];
            startIndex++;
            endIndex++;
        }
    }
    if(text[startIndex]) {
        finalString += text[startIndex];
    }
    return finalString;
}