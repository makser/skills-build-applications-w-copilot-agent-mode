import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-4 mb-4 bg-white rounded">
      <h1 className="display-5 text-success mb-4">Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No leaderboard data found.</td>
              </tr>
            ) : (
              leaders.map((leader, idx) => (
                <tr key={leader.id || idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{leader.name}</td>
                  <td>{leader.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-end">
        <button className="btn btn-success">Refresh Leaderboard</button>
      </div>
    </div>
  );
};

export default Leaderboard;
