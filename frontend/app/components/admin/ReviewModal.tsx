import { Application } from '../../types'

interface Props {
    application: Application
    onClose: () => void
    onStatusUpdate: (applicationId: number, status: string) => void
}

export default function ReviewModal({ application, onClose, onStatusUpdate }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Review Application #{application.id}</h2>
                <div className="space-y-2 mb-6">
                    <p className="text-gray-600">Applicant: <span className="text-gray-900">{application.user.username}</span></p>
                    <p className="text-gray-600">License Type: <span className="text-gray-900">{application.license_type}</span></p>
                    <p className="text-gray-600">Status: <span className="text-gray-900">{application.status}</span></p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => onStatusUpdate(application.id, 'approved')}
                        className="btn btn-primary"
                    >
                        Approve
                    </button>
                    <button 
                        onClick={() => onStatusUpdate(application.id, 'rejected')}
                        className="btn bg-red-600 text-white hover:bg-red-500"
                    >
                        Reject
                    </button>
                    <button 
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
} 