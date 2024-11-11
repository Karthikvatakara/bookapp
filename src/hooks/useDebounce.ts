import { useEffect, useState, useRef } from "react";

export const useDebounce = (value: string, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
       
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

   
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

   
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return debouncedValue;
};