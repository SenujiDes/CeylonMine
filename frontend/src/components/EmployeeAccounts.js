const handleStatusToggle = async (employeeId, currentStatus) => {
    try {
        const response = await fetch(`/api/employees/update-status/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: !currentStatus })
        });

        const data = await response.json();
        
        if (data.success) {
            // Update your local state or trigger a refresh
            // Depending on how you're managing state
            fetchEmployees(); // or similar refresh function
        } else {
            console.error('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

// Update your toggle button to use this handler
return (
    // ... existing code ...
    <button 
        onClick={() => handleStatusToggle(employee._id, employee.isActive)}
        className={`btn ${employee.isActive ? 'btn-primary' : 'btn-secondary'}`}
    >
        {employee.isActive ? 'Active' : 'Inactive'}
    </button>
    // ... existing code ...
); 