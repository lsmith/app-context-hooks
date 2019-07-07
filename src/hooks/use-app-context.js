import { useContext } from 'react';
import { AppContext } from '../AppContext';

// All inclusive hook that exposes the entire container, with API
// implementations determined by the AppContextProvider consumer
export default () => {
    let context = useContext(AppContext);
    if (!context) {
        throw new Error("Must be used inside a AppContextProvider");
    }

    return context;
};
