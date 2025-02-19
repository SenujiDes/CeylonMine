import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AdminLayout from '@/components/layouts/AdminLayout'
import ApplicationTable from '@/components/admin/ApplicationTable'
import DashboardStats from '@/components/admin/DashboardStats'
import { Application } from '@/types'

export default function AdminDashboard() {
    const { user } = useAuth()
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/admin/applications')
            const data = await response.json()
            setApplications(data)
        } catch (error) {
            console.error('Error fetching applications:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Mining License Administration</h1>
                <DashboardStats applications={applications} />
                <ApplicationTable 
                    applications={applications} 
                    loading={loading}
                    onStatusUpdate={fetchApplications} 
                />
            </div>
        </AdminLayout>
    )
}