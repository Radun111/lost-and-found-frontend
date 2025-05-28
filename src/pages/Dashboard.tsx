import Navbar from '../components/Navbar';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Lost Items</h5>
                <p className="card-text">View and manage lost items</p>
                <a href="/items" className="btn btn-primary">
                  Go to Lost Items
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Found Items</h5>
                <p className="card-text">View and manage found items</p>
                <a href="/items" className="btn btn-success">
                  Go to Found Items
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Requests</h5>
                <p className="card-text">Manage item claims</p>
                <a href="/requests" className="btn btn-warning">
                  Go to Requests
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}