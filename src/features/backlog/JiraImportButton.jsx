import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Link } from '@mui/material';

const JiraImportButton = ({project}) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [jiraUrl, setJiraUrl] = useState('');
    const [apiKey, setApiKey] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = `${email}:${apiKey}`;
        const encodedCredentials = btoa(credentials);

        const data = {
            encodedEmailAndApiKey:encodedCredentials,
            jiraURL:jiraUrl,
            ...project
        };

        try {
            const response = await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert('Submitted successfully');
                setOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Error submitting data:', errorData);
                alert('Failed to submit');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error connecting to API');
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Import to JIRA
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="jira-dialog-title">
                <DialogTitle id="jira-dialog-title">Enter your JIRA details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your JIRA details to proceed with the import.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <TextField
                        margin="dense"
                        label="JIRA URL"
                        type="url"
                        fullWidth
                        value={jiraUrl}
                        onChange={(e) => setJiraUrl(e.target.value)}
                        required />
                    <Link href="guide-to-jira-url" target="_blank" rel="noopener">
                    Guide to finding your JIRA base URL
                    </Link>
                    <TextField
                        margin="dense"
                        label="API Key"
                        type="text"
                        fullWidth
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required />
                    <Link href="https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/" target="_blank" rel="noopener">
                    Guide to generating your JIRA API key
                    </Link>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default JiraImportButton;