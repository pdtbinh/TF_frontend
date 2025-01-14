import axios from 'axios'
import { API_URL } from './config'
import Cookies from 'js-cookie'

import { getCurrentUser } from './auth'
import { getCourse, getSelectedCourseCookies } from './course'

// Get all course projects / Función para obtener todos los proyectos 
const getProjects = async (courseId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/list-projects`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error listing projects')
	}
}

// Get a spesific project / Función para obtener un proyecto específico
const getProject = async (projectId) => {
	console.log("received project id " + projectId)
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/get-project/${projectId}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error getting project')
	}
}

/**
 * Function to create a project.
 * @param {Object} projectData - Project data.
 * @param {string} projectData.name - Project title.
 * @param {string} projectData.description - Project description.
 * @param {string} projectData.teamName - Project team name.
 * @param {string} projectData.teammates - Project teammates.
 * @param {string} projectData.courseId - Course ID.
 * @param {string} projectData.keywords - Keywords
 * @param {string} projectData.skills - Skills
*/
const createProject = async (projectData) => {
	try {
		const user = getCurrentUser()
		const courseId = getSelectedCourseCookies()
		const response = await axios.post(`${API_URL}/project/create-project`, projectData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error creating project')
	}
}

const editProject = async (projectData) => {
	try {
		const user = getCurrentUser()
		const courseId = getSelectedCourseCookies()
		const response = await axios.put(`${API_URL}/project/edit-project`, projectData, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error editting project')
	}
}

const deleteProject = async (projectId) => {
	try {
		const user = getCurrentUser()
		const courseId = getSelectedCourseCookies()
		console.log(user)
		const response = await axios.delete(`${API_URL}/project/remove-project`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				projectId
			}

		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error('Error deleting project')
	}
}

const getUserCourseProject = async (courseId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/my-course-project`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				courseId: courseId
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Error getting the user's project")
	}
}

const getProjectMembers = async (projectId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.get(`${API_URL}/project/project-members`, {
			headers: {
				'Authorization': `Bearer ${user.token}`
			},
			params: {
				projectId: projectId
			}
		})
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error("Error getting members of the project")
	}
}


const applyToProject = async (projectId) => {
	try {
		const user = getCurrentUser()
		const response = await axios.post(`${API_URL}/project/apply-to-project`,
			{ projectId },
			{
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			}
		)
		return response.data
	} catch (error) {
		console.error('Error applying to project', error)
		throw error
	}
}

const setUserProjectCookies = (projectId) => {
	Cookies.set('projectId', projectId, { expires: 7, secure: true, sameSite: 'Strict' })
}

const getUserProjectCookies = () => {
	return Cookies.get('projectId')
}

const removeUserProjectCookies = () => {
	Cookies.remove('projectId')
}

const setProjectMemberStatusCookies = (status) => {
	Cookies.set('projectMemberStatus', status, { expires: 7, secure: true, sameSite: 'Strict' })
}

const getProjectMemberStatusCookies = () => {
	return Cookies.get('projectMemberStatus')
}

const removeProjectMemberStatusCookies = () => {
	Cookies.remove('projectMemberStatus')
}

export {
	getProjects,
	getProject,
	createProject,
	editProject,
	deleteProject,
	getUserCourseProject,
	getProjectMembers,
	applyToProject,
	setUserProjectCookies,
	getUserProjectCookies,
	removeUserProjectCookies,
	setProjectMemberStatusCookies,
	getProjectMemberStatusCookies,
	removeProjectMemberStatusCookies
}
