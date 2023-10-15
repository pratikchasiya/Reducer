import React, { Fragment, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { tokenReducer } from '../reducer';

/* COMPONENT NI AGAR ASYNC LAKHVANU NAI TO ERROR AVSE */
/* ASYNC AWAIT ONLY FUNCTION MAJ USE THAY */
/* TOKEN NO USE KARVA GO REST NAME NI WEBSITE MA GAI AMA USER VALA MA GAI AMA APRE LOGIN KARI AMA J LINK MLSE ANO USE KARVANO */
const ReducerTokenApiCrud = () => {
    const [array, setarray] = useState([]);
    const [blankObj, setblankObj] = useState({ name: '', gender: '', status: '', email: '' });
    let [obj, setobj] = useState({ ...blankObj });
    let [state, dispatch] = useReducer(tokenReducer, [])

    /* TOKEN MA J PN DATA HSE ATO BATAVSE J BUT JYRE APRE POTANA DATA KOI ADD KARIYE AND ANE PN BATAVA HOI TO AA RITE EK OBJECT BATAVI AMA HEADERS NI UNDER AUTHORIZATION LAKHI AMA BEARER LAKHVU COMPULSARY CHE P6I SPACE API APRA TOKEN NI J LINK HOI A NAKHAVNI */
    let authToken = {
        headers: {
            "Authorization": "Bearer 33015f07de30ac70869a4c002347fa9a700a3db037a55ad95579577e3cbd0be9"
        }
    }
    useEffect(() => {
        dispatch({ type: 'GET' })
    }, []);

    useEffect(() => {
        getApiValue()
        // console.log(state)
    }, [state]);

    const getApiValue = async () => {
        console.log(await state)
        setarray([... await state])
    }

    const getData = (e) => {
        obj[e.target.name] = e.target.value;
        setobj({ ...obj });
    };

    const save = () => {
        if (obj.id == undefined) {
            dispatch({ type: 'ADD', obj: obj })
            // dispatch({ type: 'GET' })
        } else {
            dispatch({ type: 'EDIT', obj: obj })
        }
        // dispatch({ type: 'GET' })
        // getApiValue()
        setobj({ ...blankObj });
    };

    const editData = (id) => {
        let editObj = array.find(x => x.id === id);
        setobj({ ...editObj });
        console.log(editObj)
    }

    const deleteData = (id) => {
        dispatch({ type: 'DELETE', id })
    }

    return (
        <Fragment>
            <div className='text-center'>ReducerTokenApiCrud</div>

            <form action="" className="w-50 mx-auto border border-1 p-4 mt-5" >
                <h3>FORM </h3>
                <label htmlFor="" className="d-block">
                    Name :
                </label>
                <input type="text" name="name" className="w-100" value={obj.name || ""}
                    onChange={getData} />

                <label htmlFor="" className="d-block">
                    Email :
                </label>
                <input type="email" name="email" className="w-100" value={obj.email || ""}
                    onChange={getData} />


                <label htmlFor="" className="d-block">
                    Gender :
                </label>

                <input type="radio" name="gender" value="male" className="me-2" checked={obj.gender == "male"}
                    onChange={getData} />
                Male

                <input type="radio" name="gender" value="female" className="mx-2" checked={obj.gender == "female"}
                    onChange={getData} />
                Female

                <label htmlFor="" className="d-block">
                    Status :
                </label>

                <input type="radio" name="status" value="active" className="me-2" checked={obj.status == "active"}
                    onChange={getData} />
                Active

                <input type="radio" name="status" value="inactive" className="mx-2" checked={obj.status == "inactive"}
                    onChange={getData} />
                InActive

                <br />

                <button type="button" className="btn btn-success mt-4" onClick={save}>
                    Save
                </button>
            </form>

            {/* TABLE */}

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {array?.map((x, i) => {

                        return (

                            <tr key={i}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.gender}</td>
                                <td>{x.status}</td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => editData(x.id)}>EDIT</button>
                                    <button className="btn btn-danger me-2" onClick={() => deleteData(x.id)}>DELETE</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ReducerTokenApiCrud