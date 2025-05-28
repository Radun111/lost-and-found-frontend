import { useEffect, useState } from 'react';
import { Request } from '../types/request';
import { fetchRequests, updateRequestStatus } from '../services/requestService';

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const loadRequests = async () => {
      const data = await fetchRequests();
      setRequests(data);
    };
    loadRequests();
  }, []);

  const handleStatusChange = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    await updateRequestStatus(id, status);
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Item Requests</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Item</th>
              <th className="px-6 py-3 text-left">Requester</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="px-6 py-4">{request.item.title}</td>
                <td className="px-6 py-4">{request.user.username}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                    request.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {request.status === 'PENDING' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(request.id, 'APPROVED')}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, 'REJECTED')}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}