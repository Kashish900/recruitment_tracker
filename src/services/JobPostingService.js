import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

class JobPostingService {
    // Method to fetch all job postings
    async getAllJobPostings() {
        try {
            const response = await axios.get(`${API_URL}jobpostings/`);
            return response.data;
        } catch (error) {
            console.error('Error while fetching job postings:', error);
            throw error;
        }
    }

    // Method to fetch a single job posting by ID
    async getJobPostingById(id) {
        try {
            const response = await axios.get(`${API_URL}jobposting/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error while fetching job posting ${id}:`, error);
            throw error;
        }
    }

    // Method to add a new job posting
    async addJobPosting(jobPostingData) {
        try {
            const response = await axios.post(`${API_URL}jobposting/save/`, jobPostingData);
            return response.data;
        } catch (error) {
            console.error('Error while adding job posting:', error);
            throw error;
        }
    }

    // Method to update an existing job posting
    async updateJobPosting(id, jobPostingData) {
        try {
            const response = await axios.put(`${API_URL}jobposting/update/${id}/`, jobPostingData);
            return response.data;
        } catch (error) {
            console.error(`Error while updating job posting ${id}:`, error);
            throw error;
        }
    }

    // Method to delete a job posting
    async deleteJobPosting(id) {
        try {
            const response = await axios.delete(`${API_URL}jobposting/delete/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error while deleting job posting ${id}:`, error);
            throw error;
        }
    }

    // to perform search operations
    async searchJobPostings(fieldname, fieldvalue) {
        try {
            const response = await axios.get(`${API_URL}jobpostings/search/?fieldname=${fieldname}&fieldvalue=${fieldvalue}`);
            return response.data;
        } catch (error) {
            console.error(`Error while searching job postings by ${fieldname}=${fieldvalue}:`, error);
            throw error;
        }
    }

    //to perform updating visibility
    async updateVisibilityStatus() {
        try {
          const response = await axios.get(`${API_URL}jobpostings/update-visibility/`);
          return response.data;
        } catch (error) {
          console.error('Error updating visibility status:', error);
          throw error;
        }
      }
      
}

export default new JobPostingService();
