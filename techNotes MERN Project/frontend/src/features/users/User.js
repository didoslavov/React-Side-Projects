import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { selectUserById } from './usersApiSlice.js';

import React from 'react';

const User = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId));

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate('/dash/user/' + userId);

        const userRoleString = user.roles.toString().replaceAll(',', ', ');

        const cellStatus = user.active ? '' : 'table__cell--inactive';

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRoleString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button className="icon-button table__button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    }
};

export default User;
