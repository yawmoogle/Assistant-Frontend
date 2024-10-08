import React from 'react';

const DownloadButton = ({dltarget}) => {
  const handleDownload = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(dltarget));
    try {
      // Make a POST request to the backend endpoint
      const response = await fetch('https://assistant-backend-uhn9.onrender.com/api/v1/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dltarget),
      });
      // Check if the response is ok
      if (response.ok) {
        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jira_details.csv'; // Specify the file name

        // Append the link to the body
        document.body.appendChild(a);
        
        // Programmatically click the link to trigger the download
        a.click();

        // Clean up and revoke the object URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download CSV');
      }
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return <button className="ml-5 border-2 bg-button hover:bg-sidebar" onClick={handleDownload}>Download CSV</button>;
};

export default DownloadButton;