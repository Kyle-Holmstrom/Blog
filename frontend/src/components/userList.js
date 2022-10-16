import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import PortraitSharpIcon from '@mui/icons-material/PortraitSharp';

const User = (props) => (
    <tr>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>{props.user.email}</td>
        <td>{props.user.userName}</td>
        <td>{props.user.password}</td>
        <td>{props.user.avatar || <PortraitSharpIcon />}</td>
        <td>{props.user.isAdmin}</td>
        <td>
            <Button variant="contained" >
                <Link to={`/update/${props.user._id}`}
                    style={{color: 'white', textDecoration: 'none'}}
                    >Edit</Link>
                </Button> 
            <Button variant="contained" style={{marginLeft: '5px'}}
                onClick={() => {
                    props.deleteUser(props.user._id);
                }}
            >
                Delete
            </Button>
        </td>
    </tr>
);

export default function RecordList() {
    const [users, setUsers] = useState([]);

    // This method will fetch the records from the database.
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`http://localhost:4000/users`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const users = await response.json();
            setUsers(users);
        }

        getUsers();

        return;
    }, [users.length]);
    
    // this method will delete a record
    async function deleteUser(id) {
        await fetch(`http://localhost:4000/${id}`, {
            method: "DELETE"
        });

        const newUser = users.filter((el) => el._id !== id);
        setUsers(newUser);
    }

    // This method will map out the users on the table
    function userList() {
        return users.map((user) => {
            return (
                <User
                    user={user}
                    deleteRecord={() => deleteUser(user._id)}
                    key={user._id}
                    />
            );
        });
    }

    return (
        <div>
            <h3>User List</h3>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>E-Mail</th>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>avatar</th>
                        <th>Is an Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {userList()}
                </tbody>
            </table>
            <Button variant="contained">
                <Link to="/add-user" style={{textDecoration: 'none', color: 'white'}}>Create User</Link>
            </Button>
        </div>
    );
}