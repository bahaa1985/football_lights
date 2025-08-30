import { createSlice } from "@reduxjs/toolkit";

const initialState={
    requestsCount:0
}

const counterSlice = createSlice(
    {
        name:'counter',
        initialState,
        reducers:{
            requestsIncrement(state){
                state.requestsCount++;
                console.log("Incremented requestsCount to", state.requestsCount);
                
            },
            resetRequests(state){
                state.requestsCount=0;
                console.log("Requests counter reset to 0");
            },            
        }
    }
)

export default counterSlice.reducer;
export const {requestsIncrement,resetRequests} = counterSlice.actions;
