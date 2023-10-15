export const counterReducer = (state, action) => {
  console.log(state, action);
  /* AHIYA IF ELSE CONDITION MARE TO PN CHALE BUT REACT MA SWITCH CASE USE KARVANU PREFER KARVAMA AVE CHE */
  switch(action.type) {
    case 'GET' : {
     state.push({name : 'pratik', age : 25})
        return state;
    }
    case 'ADD' : {
        state.push(action.obj)
        return state;
    }
    case 'DELETE' : {
      state.splice(action.index, 1)
        return state;
    }
    default : {
        return state;
    }
  }
  return action;
};
