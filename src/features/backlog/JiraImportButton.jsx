import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Link } from '@mui/material';
import { useAlertContext } from '../../contexts/alert/useAlertContext';

const JiraImportButton = ({project}) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [jiraUrl, setJiraUrl] = useState('');
    const [apiKey, setApiKey] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !jiraUrl || !apiKey) {
            alert('Please fill in all details for JIRA import.')
            return;
        }

        const credentials = `${email}:${apiKey}`;
        const encodedCredentials = btoa(credentials);

        const data = {
            encodedEmailAndApiKey:encodedCredentials,
            jiraURL:jiraUrl,
            ...project
        };

        console.log(data);

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
                        error={!validateEmail(email)}
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        helperText={ validateEmail(email) ? " " : "Please enter a valid email"}
                        />
                    <TextField
                        error={!jiraUrl}
                        margin="dense"
                        label="JIRA URL"
                        type="url"
                        fullWidth
                        required value={jiraUrl}
                        onChange={(e) => setJiraUrl(e.target.value)}
                        />
                    <Link href="https://confluence.atlassian.com/jirakb/how-to-find-your-site-url-to-set-up-the-jira-data-center-and-server-mobile-app-954244798.html" target="_blank" rel="noopener">
                    Guide to finding your JIRA base URL
                    </Link>
                    <TextField
                        error={!apiKey}
                        margin="dense"
                        label="API Key"
                        type="text"
                        fullWidth
                        required value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        />
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