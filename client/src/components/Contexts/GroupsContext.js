import { useEffect } from "react";
import { createContext, useReducer } from "react";

const initialState = {
  status: "idel",
  groups: [],
  selectedEvent:{} 
};
export const GroupsContext = createContext(null);
//th reducer for handleing the Groups actions
const reducer = (state, action) => {
    console.log("Action",action);
  switch (action.type) {
    case "get-all-group":
      return {
        ...state,
        status: "dataLoded",
        groups: [...action.groups],
      };
    case "update-participant":
      {
        const newState = { ...state };
        if (action.data.method === "push") {
          //push userId into selected event
          console.log("newState Befor",newState);
          newState.groups
            .find((group) => group._id === action.data.groupId)
            .annuncements.find((event) => event.id === action.data.eventId)
            .participants.push(action.data.userId);
        } else {
          const index = newState.groups
            .find((group) => group._id === action.data.groupId)
            .annuncements.find((event) => event.id === action.data.eventId)
            .participants.indexOf(action.data.userId);
            
          newState.groups
            .find((group) => group._id === action.data.groupId)
            .annuncements.find((event) => event.id === action.data.eventId)
            .participants.splice(index, 1);
        }
        console.log("newState After",newState);

        return {
          status: "updateParticipant",
          ...newState,
        };
      }
      case "select-event":{
        return {
            ...state,
        status:"set an event",
        selectedEvent: action.selectedEvent}
      }
      break;

    default:
      break;
  }
};

export const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //fetch all groups from backent
  const getAllGroups = () => {
    console.log("group context")
    fetch("/api/AllGroups")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //Load data into reducer state
          dispatch({
            type: "get-all-group",
            groups: [...data.data],
          });
        }
      });
  };

  //set a user as participant in spetial group
  const updateEventParticipant = (data) => {
    console.log("---------------groupContext-------------");
    console.log({
        groupId: data.groupId,
        eventId: data.eventId,
        userId: data.userId,
        method: data.method, //specify we have to do pull or push
      },
    );
   return fetch("/api/group/patricipant", {
      method: "PATCH",
      headers: { 
        "Content-type": "application/json",
        Accept:"application/json" },
      body: JSON.stringify({
          groupId: data.groupId,
          eventId: data.eventId,
          userId: data.userId,
          method: data.method, //specify we have to do pull or push
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200){
          dispatch({
            type: "update-participant",
            data: data,
        });
        return true
    }
    return false;
      });
  };
  // set an event in selectedEvent 
  const setCurrentEvent = (event) => {
    dispatch({
        type: "select-event",
        selectedEvent:event
    })
  }

  return (
    <GroupsContext.Provider
      value={{
        state,
        actions: {
          getAllGroups,
          updateEventParticipant,
          setCurrentEvent
        },
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
