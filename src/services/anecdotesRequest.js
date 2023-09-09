import axios from "axios";

const API_URL = "http://localhost:3001/anecdotes";

export const getAllAnecdotes = async () => {
  const result = await axios.get(API_URL);
  return result.data;
};

export const createAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(API_URL, newAnecdote);
  return response.data;
};

export const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${API_URL}/${anecdote.id}`, anecdote);
  return response.data;
};
