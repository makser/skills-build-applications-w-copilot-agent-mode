import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-4 mb-4 bg-white rounded">
      <h1 className="display-5 text-info mb-4">Teams</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team Name</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">No teams found.</td>
              </tr>
            ) : (
              teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{team.name}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-end">
        <button className="btn btn-info">Create Team</button>
      </div>
    </div>
  );
};

export default Teams;
