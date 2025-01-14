import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import TFmenu from '../components/TFmenu'
import ProjectProposalForm from '../components/ProjectProposalForm'
import UserProjectCard from '../components/UserProjectCard'

import { createProject, getUserCourseProject, setUserProjectCookies, setProjectMemberStatusCookies } from '../services/project'
import { getSelectedCourseCookies } from '../services/course'

import '../styles/projectproposal.css'

const ProjectProposal = () => {
    const [hasProject, setHasProject] = useState(false)
    const selectedCourseId = getSelectedCourseCookies()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectData = async () => {
            if (selectedCourseId) {
                try {
                    const existingProject = await getUserCourseProject(selectedCourseId)
                    setHasProject(!!existingProject)
                } catch (error) {
                    console.error("Failed to check project existence:", error)
                }
            }
        }

        fetchProjectData()
    }, [selectedCourseId])

    const handleProjectCreation = async (project) => {
        if (!project) {
            alert("Error creating a project")
            return
        }

        const userConfirmed = window.confirm(
            "Are you sure you want to create this project?"
        )

        if (!userConfirmed) {
            return
        }

        try {
            const createdProject = await createProject({
                name: project.title,
                description: project.description,
                skills: project.skills,
                keywords: project.keywords,
                teamName: project.teamName,
                teammates: project.teammates,
                courseId: selectedCourseId,
            })

            alert("Project has been created successfully!")
            console.log(`Creating project in course ${selectedCourseId}`)

            const fetchedCreatedProject = await getUserCourseProject(selectedCourseId)
            setUserProjectCookies(fetchedCreatedProject.id)
            setProjectMemberStatusCookies('CREATOR')
            setHasProject(true)
            
            navigate("/yourProject")
        } catch (error) {
            console.error("Error creating a project:", error)
            alert("An error occurred while creating the project.")
        }
    }

    return (
        <>
            < TFmenu />

            <div className="project-proposal-container">
                {hasProject ? (
                    <div className="has-project">
                        <h3>You're already a member of a project</h3>
                        <a href="/yourProject">View your project</a>
                    </div>
                ) : (
                    <ProjectProposalForm handleProjectCreation={handleProjectCreation} />
                )}
            </div>

        </>
    )
}

export default ProjectProposal
