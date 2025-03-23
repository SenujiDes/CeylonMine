const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileData.file || !fileData.description) {
      setSuccessMessage('Please provide both a file and description.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('description', fileData.description);
    formData.append('date', new Date().toISOString().split('T')[0]);
  
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        setAttachedFiles([...attachedFiles, result.file]);
        setSuccessMessage('File successfully attached!');
        setFileData({
          file: null,
          description: ''
        });
        document.getElementById('file-upload-form').reset();
      } else {
        setSuccessMessage('Failed to attach file. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('Failed to attach file. Please try again.');
    }
  };