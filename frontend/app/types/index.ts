export interface Application {
    id: number
    user: {
        id: number
        username: string
    }
    license_type: string
    status: string
    submitted_at: string
    documents: Document[]
}

export interface Document {
    id: number
    document_type: string
    file_path: string
    validation_status: string
} 