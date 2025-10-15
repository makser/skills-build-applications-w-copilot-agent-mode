import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-4 mb-4 bg-white rounded">
      <h1 className="display-5 text-warning mb-4">Workouts</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Workout Name</th>
              <th scope="col">Type</th>
              <th scope="col">Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No workouts found.</td>
              </tr>
            ) : (
              workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{workout.name}</td>
                  <td>{workout.type}</td>
                  <td>{workout.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-end">
        <button className="btn btn-warning">Add Workout</button>
      </div>
    </div>
  );
};

export default Workouts;
