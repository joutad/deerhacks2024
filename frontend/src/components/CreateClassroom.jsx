import React, { useState } from 'react'
import { useUser } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateClassroom = () => {
    const { userType, authenticatedUser } = useUser();
    const [subject, setSubject] = useState('');
    const [code, setCode] = useState('');
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        console.log(subject, code, number, name, description);
        console.log(authenticatedUser);

        try {
            const teacher = authenticatedUser['_id'];
            console.log(teacher, typeof teacher);
            const res = await axios.post('/api/classes/create', {subject, code, number, name, description, teacher});
            console.log(res.data);
            navigate('/classrooms');
        } catch (error) {
            setError('Failed to create classroom!');
            console.error('Error creating classroom', error);
        }
    }

    return (
        <div>
            {userType === "teacher" ? (
                <>
                    <h1>CREATE CLASSROOM</h1>
                    <form action="post" onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="subject">subject </label></td>
                                    <td><input type="text" name="subject" id="subject" placeholder='e.g. ENGL, HIST, BIO' value={subject} onChange={(e) => setSubject(e.target.value)}/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="code">code </label></td>
                                    <td><input type="text" name="code" id="code" placeholder='e.g. 100, 1301, 704' value={code} onChange={(e) => setCode(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="number">number </label></td>
                                    <td><input type="text" name="number" id="number" placeholder='e.g. 01, 02, 10' value={number} onChange={(e) => setNumber(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="name">name</label></td>
                                    <td><input type="text" name="name" id="name" placeholder='e.g. Organic Chemistry' value={name} onChange={(e) => setName(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="description">description</label></td>
                                    <td><textarea name="description" id="description" cols="16" rows="10" placeholder='type a brief description here...' value={description} onChange={(e) => setDescription(e.target.value)} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit">Create!</button>
                    </form>
                    {error && <p>{error}</p>}
                </>)
                :
                (
                    "Not Authorized."
                )
            }
        </div>
    )
}

export default CreateClassroom