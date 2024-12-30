import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

class CandidateService {
    // Method to fetch all candidates
    async getAllCandidates() {
        try {
            const response = await axios.get(`${API_URL}candidates/`);
            return response.data;
        } catch (error) {
            console.error('Error while fetching candidates:', error);
            throw error;
        }
    }

    // Method to fetch a single candidate by ID
    async getCandidateById(id) {
        try {
            const response = await axios.get(`${API_URL}candidate/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error while fetching candidate ${id}:`, error);
            throw error;
        }
    }

    // Method to add a new candidate
    async addCandidate(candidateData) {
        try {
            const response = await axios.post(`${API_URL}candidate/save/`, candidateData);
            return response.data;
        } catch (error) {
            console.error('Error while adding candidate:', error);
            throw error;
        }
    }

    // Method to update an existing candidate
    async updateCandidate(id, candidateData) {
        try {
            const response = await axios.put(`${API_URL}candidate/update/${id}/`, candidateData);
            return response.data;
        } catch (error) {
            console.error(`Error while updating candidate ${id}:`, error);
            throw error;
        }
    }

    // Method to delete a candidate
    async deleteCandidate(id) {
        try {
            const response = await axios.delete(`${API_URL}candidate/delete/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error while deleting candidate ${id}:`, error);
            throw error;
        }
    }
}

export default new CandidateService();
