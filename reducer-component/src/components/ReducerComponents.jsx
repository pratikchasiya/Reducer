import React, { Fragment, useEffect, useReducer } from 'react'
import { counterReducer } from '../reducers'


const ReducerComponents = () => {
    let defaultState = 20
    /* USE REDUCER NA 2ND PARAMETER MA APRE J AA DEFAULTSTATE AAPYO CHE A AVSE  */
    // const [state, dispatch] = useReducer(counterReducer, defaultState)

    /* USE REDUCER MA PM PEHLA PARAMETER MA STATE MLSE AND 2ND PARAMETER MA AAPRE JE ACTION APSE A APRNE J REDUCER FUNCTION BANAVYU CHE ANA ACTION MA MLSE DISPATCH A SET STATE JEVU KAM KRE AND APRE J STATE AAPYO HOI A AAPRNE REDUCER FUNCTION NA STATE NI UNDER MLE AND KAI CHANGE KRIYE A APRNE ACTION MA MLE */
    const [state, dispatch] = useReducer(counterReducer, [])

    useEffect(() => {
     dispatch({ type : 'GET'})
    }, [])

    console.log(state)
  return (
   <Fragment>
     <div>ReducerComponents</div>
     {/* <button className='btn btn-info me-3 mt-2' onClick={()=>dispatch(state + 1)}>Increment</button> */}
     {/* <button className='btn btn-warning mt-2' onClick={()=>dispatch(state - 1)}>Decrement</button> */}
     <button className='btn btn-info mt-2 me-2' onClick={()=>dispatch({type : 'ADD', obj : {name : 'Pratik'}})}>ADD</button>
     <button className='btn btn-warning mt-2' onClick={()=>dispatch({type : 'DELETE', index : 1})}>DELETE</button>
   </Fragment>
  )
}

export default ReducerComponents