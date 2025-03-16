router.put('/update-status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const employee = await Employee.findByIdAndUpdate(
            id,
            { isActive: status },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ 
            success: true, 
            message: 'Status updated successfully',
            employee 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error updating status',
            error: error.message 
        });
    }
}); 