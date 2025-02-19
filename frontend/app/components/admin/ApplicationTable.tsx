import { useState } from 'react'
import { Application } from '@/types'
import { formatDate } from '@/utils/date'
import ReviewModal from './ReviewModal'

interface Props {
    applications: Application[]
    loading: boolean
    onStatusUpdate: () => void
}

export default function ApplicationTable({ applications, loading, onStatusUpdate }: Props) {
    const [selectedApp, setSelectedApp] = useState<Application | null>(null)

    const handleStatusUpdate = async (applicationId: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/admin/applications/${applicationId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            
            if (response.ok) {
                onStatusUpdate()
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="dashboard-table">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="table-header">ID</th>
                        <th className="table-header">Applicant</th>
                        <th className="table-header">Type</th>
                        <th className="table-header">Status</th>
                        <th className="table-header">Submitted</th>
                        <th className="table-header">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                        <tr key={app.id}>
                            <td className="table-cell">{app.id}</td>
                            <td className="table-cell">{app.user.username}</td>
                            <td className="table-cell">{app.license_type}</td>
                            <td className="table-cell">
                                <StatusBadge status={app.status} />
                            </td>
                            <td className="table-cell">{formatDate(app.submitted_at)}</td>
                            <td className="table-cell">
                                <button
                                    onClick={() => setSelectedApp(app)}
                                    className="btn btn-primary"
                                >
                                    Review
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedApp && (
                <ReviewModal
                    application={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
        pending_review: 'bg-yellow-100 text-yellow-800',
        under_review: 'bg-blue-100 text-blue-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${colors[status] || 'bg-gray-100'}`}>
            {status.replace('_', ' ').toUpperCase()}
        </span>
    )
}