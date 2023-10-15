export const localStorageCrudReducer = (state, action) => {
  switch (action.type) {
    case "SAVE": {
        if(action.obj.id == undefined){
            action.count = action.count + 1;
            action.setcount(action.count);
           
            action.obj.id = action.count; 
            action.array.push(action.obj);
          }
          else{
             let index = action.array.findIndex(x => x.id == action.obj.id)
             action.array.splice(index , 1 , action.obj)
          }
          
          console.log(action.count);
          action.setarray([...action.array]);
          action.setobj({...action.blankObj});
          console.log(action.array);
          action.fileRef.current.value = ""
          localStorage.setItem('array', JSON.stringify(action.array))
          localStorage.setItem('count', action.count)
          return state
        }

    case "DELETE" : {
        let index = action.array.findIndex(x => x.id == action.id)
        action.array.splice(index, 1)
        action.setarray([...action.array])
        localStorage.setItem('array', JSON.stringify(action.array))
    }

    default : {
        return state
    }
  }
};
