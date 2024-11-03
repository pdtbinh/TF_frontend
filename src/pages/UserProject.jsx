import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import UserProjectCard from '../components/UserProjectCard'

import { getSelectedCourseCookies } from '../services/course'
import { getUserCourseProject } from '../services/project'

import '../styles/nonexistinguserproject.css'

const UserProject = () => {
    const [project, setProject] = useState(null) 

    const selectedCourse = getSelectedCourseCookies()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourse) {
                try {
                    const fetchedProject = await getUserCourseProject(selectedCourse)
                    setProject(fetchedProject)
                    console.log("Existing project: ", project.name)
                } catch (error) {
                    console.error("Failed to check project existence:", error)
                }

            }
        }

        fetchProjectData()
    }, [selectedCourse])

    return (
        <>
            < TFmenu />

            <div className="project-proposal-container">
                {project? (
                    <UserProjectCard
                        teamName={project.teamName}
                        title={project.name}
                        description={project.description}
                        teammates={project.maxMembers}
                    />
                ) : (
                    <div className="no-project-container">
                        <h2 className="no-project-header">
                            You are not a member of a project yet.
                        </h2>
                        <div className="no-project-links">
                            <p>Find new projects:</p>
                            <a href="/projectSearch">Search projects</a>
                            <p>... or create a new project:</p>
                            <a href="/projectProposal">Create a new project</a>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default UserProject
