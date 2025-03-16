const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    // ... other fields ...
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// ... existing code ... 