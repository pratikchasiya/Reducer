import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import { localStorageCrudReducer } from '../reducer';

const ReducerLocalStorageCrud = () => {
    let [count, setcount] = useState(0);
    const [blankObj, setblankObj] = useState({});
    const [obj, setobj] = useState({ hobbies: [] });
    const [array, setarray] = useState([]);
    const fileRef = useRef()
    const [state, dispatch] = useReducer(localStorageCrudReducer, [])


    const getData = async (e) => {
        if (e.target.name == "hobbies") {
            if (e.target.checked) {
                obj.hobbies?.push(e.target.value);
            } else {
                obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);
            }
            blankObj.hobbies = [];
        }
        else if (e.target.name == "profile") {
            console.log(e.target.files[0]);
            obj.profile = await toBase64(e.target.files[0])

        } else {

            obj[e.target.name] = e.target.value;
            blankObj[e.target.name] = "";
        }

        setobj({ ...obj });
        setblankObj({ ...blankObj });
    };

    const save = () => {
        dispatch({ type: "SAVE", obj, array, count, setobj, blankObj, setarray, setcount, setblankObj, fileRef })
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const editUser = (id) => {
        let editObj = array.find(x => x.id == id)
        setobj({ ...editObj })
    }

    const deleteUser = (id) => {


        dispatch({ type: "DELETE", id, array, setarray })
    }

    useEffect(() => {
        setarray(JSON.parse(localStorage.getItem('array')) || [])
        setcount(JSON.parse(localStorage.getItem('count')) || 0)

    }, [])
    return (
        <Fragment>
            <form action="" className="w-50 mx-auto border border-1 p-4 mt-5">
                <h3>FORM {obj.fname}</h3>
                <label htmlFor="" className="d-block">
                    First Name
                </label>
                <input
                    type="text"
                    name="fname"
                    className="w-100"
                    value={obj.fname}
                    onChange={getData}
                />
                <label htmlFor="" className="d-block">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lname"
                    className="w-100"
                    value={obj.lname}
                    onChange={getData}
                />
                <label htmlFor="" className="d-block">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    className="w-100"
                    value={obj.email}
                    onChange={getData}
                />
                <label htmlFor="" className="d-block">
                    Gender
                </label>
                <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={obj.gender == "Male"}
                    onChange={getData}
                />
                Male
                <input
                    type="radio"
                    name="gender"
                    value="FeMale"
                    checked={obj.gender == "FeMale"}
                    onChange={getData}
                />
                Female
                <label htmlFor="" className="d-block">
                    Hobby
                </label>
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Cricket"
                    checked={obj.hobbies?.includes("Cricket")}
                    onChange={getData}
                />
                Cricket
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Football"
                    checked={obj.hobbies?.includes("Football")}
                    onChange={getData}
                />
                Footbal
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Music"
                    checked={obj.hobbies?.includes("Music")}
                    onChange={getData}
                />
                Music
                <label htmlFor="" className="d-block">
                    Profile
                </label>
                <input type="file" name="profile" onChange={getData} ref={fileRef} />
                <br />
                <button type="button" className="btn btn-success mt-4" onClick={save}>
                    Save
                </button>
            </form>

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobby</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>{x.id}</td>
                                <td>
                                    <img src={x.profile} alt="" width={40} height={40} />
                                </td>
                                <td>{x.fname}</td>
                                <td>{x.lname}</td>
                                <td>{x.email}</td>
                                <td>{x.gender}</td>
                                <td>{x.hobbies?.join(",")}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => editUser(x.id)}>EDIT</button>
                                    <button className="btn btn-danger ms-2" onClick={() => deleteUser(x.id)}>DELETE</button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ReducerLocalStorageCrud