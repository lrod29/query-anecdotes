import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAllAnecdotes, updateAnecdote } from "./services/anecdotesRequest";

const App = () => {
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading || !result.isSuccess) {
    return (
      <div>anecdote service not available due to problems in the server</div>
    );
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
