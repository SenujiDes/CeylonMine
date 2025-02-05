import React from "react";

function ComplaintList(){
    return(
        <>
            <div className="p-8 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Complaints</h2>

                {/* Table */}
                <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left border-b">
                    <th className="p-3">Complain ID</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Email address</th>
                    <th className="p-3">Project</th>
                    <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{complaint.id}</td>

                        {/* Editable Status */}
                        <td className="p-3">
                        {editStatus === complaint.id ? (
                            <select
                            value={complaint.status}
                            onChange={(e) =>
                                handleStatusChange(complaint.id, e.target.value)
                            }
                            className="p-1 border rounded"
                            >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            </select>
                        ) : (
                            <span
                            className={`px-3 py-1 rounded-full text-sm ${
                                complaint.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : complaint.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                            onClick={() => setEditStatus(complaint.id)}
                            >
                            {complaint.status}
                            </span>
                        )}
                        </td>

                        <td className="p-3">{complaint.role}</td>
                        <td className="p-3">{complaint.email}</td>

                        {/* Project Tags */}
                        <td className="p-3">
                        {complaint.project.map((tag, index) => (
                            <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs mr-1"
                            >
                            {tag}
                            </span>
                        ))}
                        </td>

                        {/* Actions */}
                        <td className="p-3">
                        <button
                            onClick={() => setSelectedComplaint(complaint)}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            View
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Complaint Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-lg font-semibold mb-2">
                    Complaint from {selectedComplaint.name}
                    </h3>
                    <p className="text-gray-700">{selectedComplaint.complaint}</p>
                    <button
                    className="mt-4 px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setSelectedComplaint(null)}
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
            </div>
        </>
    )
    
}