import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClassComponent = () => {
  const [classDetails, setClassDetails] = useState(null);
//   const classId = match.params.id; // Get class ID from route parameters
    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchClassDetails = async () => {
        try {
            const response = await axios.get(`/api/classes/class/${id}`); // Fetch class details by ID
            console.log(response.data.message);
            setClassDetails(response.data.message); // Set class details in state
        } catch (error) {
            console.error('Error fetching class details:', error);
        }
        };

        const fetchStudentList = async () => {
            try {
                const response = await axios.get(`/api/users/students/all`);
                console.log(response.data.message);
                setStudents(response.data.message);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchClassDetails();
        fetchStudentList();
    }, [id, setStudents]);

    if (!classDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>{classDetails.name}</h1>
                <p>Subject: {classDetails.subject}</p>
                <p>Code: {classDetails.code}</p>
                <p>Number: {classDetails.number}</p>
                <p>Description: {classDetails.description}</p>
            </div>
            <div>
                <ul>
                    {students.map((student, i) => {
                        // if (student.enrolledClasses) {
                            return (
                                <li key={`${i}${student.name}`}>
                                    {student.name} ({student.email})
                                </li>
                            )
                        // }
                    })}
                </ul>
                <button>Invite Students</button>
            </div>
        {}
        {/* <p>ID: {classDetails._id} {id}</p> */}
        {/* Render other class details as needed */}
        </div>
    );
};

export default ClassComponent;
