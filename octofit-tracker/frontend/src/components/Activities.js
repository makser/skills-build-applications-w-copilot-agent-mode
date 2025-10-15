import React, { useEffect, useState } from 'react';

// Bootstrap modal requires use of state for show/hide

const Activities = () => {

  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: '', duration: '' });
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;


  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        // console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would POST to the API, but for now just close modal and reset form
    setShowModal(false);
    setForm({ name: '', type: '', duration: '' });
    // Optionally, refresh activities list
  };


    return (
      <div className="card shadow-sm p-4 mb-4 bg-white rounded">
        <h1 className="display-5 text-primary mb-4">Activities</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{activity.name}</td>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-end">
          <button className="btn btn-primary" onClick={handleShowModal}>Add Activity</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Activity</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="activityName" className="form-label">Name</label>
                      <input type="text" className="form-control" id="activityName" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="activityType" className="form-label">Type</label>
                      <input type="text" className="form-control" id="activityType" name="type" value={form.type} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="activityDuration" className="form-label">Duration (min)</label>
                      <input type="number" className="form-control" id="activityDuration" name="duration" value={form.duration} onChange={handleChange} required min="1" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Activity</button>
                  </div>
                </form>
              </div>
            </div>
            {/* Modal backdrop */}
            <div className="modal-backdrop fade show"></div>
          </div>
        )}
      </div>
    );
};

export default Activities;
