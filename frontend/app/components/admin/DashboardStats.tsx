import { Application } from '@/types'

interface Props {
    applications: Application[]
}

export default function DashboardStats({ applications }: Props) {
    const stats = {
        pending: applications.filter(app => app.status === 'pending_review').length,
        underReview: applications.filter(app => app.status === 'under_review').length,
        approved: applications.filter(app => app.status === 'approved').length,
        rejected: applications.filter(app => app.status === 'rejected').length
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard title="Pending Review" value={stats.pending} color="bg-yellow-100" />
            <StatCard title="Under Review" value={stats.underReview} color="bg-blue-100" />
            <StatCard title="Approved" value={stats.approved} color="bg-green-100" />
            <StatCard title="Rejected" value={stats.rejected} color="bg-red-100" />
        </div>
    )
}

const StatCard = ({ title, value, color }: { title: string, value: number, color: string }) => (
    <div className={`${color} rounded-lg p-4 shadow-sm`}>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
)