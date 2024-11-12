import React, { useState } from "react";
import styles from "./CodeTab.module.css";
import CustomTextField from "@components/TextFieldComponents/CustomTextField/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@components/Button/Button";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { generateApiKey } from "../../../utils/generalHelper";
import { setConfig } from "../../../services/teamServices";
import { emitToastError } from "../../../utils/guideHelper";
import toastEmitter, { TOAST_EMITTER_KEY} from "../../../utils/toastEmitter";

const CodeTab = () => {
    const [apiKey, setApiKey] = useState('')
    const [serverUrl, setServerUrl] = useState('')

    const handleUrlChange = (e) => {
        setServerUrl(e.target.value);
    };

    const handleApiKeyChange = (e) => {
        setApiKey(e.target.value);
    };

    const deleteApiKey = () => {
        setApiKey('');
    }

    const onSave = async () => {
        try {
            const response = await setConfig({ serverUrl, apiKey });
            toastEmitter.emit(TOAST_EMITTER_KEY, response.message);
        } catch (err) {
            emitToastError(err);
        }
    }

    return (
        <section className={styles.container}>
            <h2>API key management</h2>
            <p className={styles.content}>Manage the key that Onboarding app uses to authenticate the agent code.</p>

            {/* api key */}
            <div className={styles.block}>
                <p style={{marginRight:'2rem'}}>API key:</p>
                <CustomTextField
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    style={{textAlign: 'right' }}
                    TextFieldWidth="550px"
                />
                <DeleteOutlinedIcon onClick={deleteApiKey} style={{ cursor: 'pointer', fontSize: '24px', color: 'var(--main-text-color)' }} />
                <Button text='Regenerate' onClick={() => setApiKey(generateApiKey())} sx={{width:'120px'}}/>
            </div>
            {/* server url */}
            <div className={styles.block}>
                <p className={styles.label}>Server URL:</p>
                <CustomTextField
                    value={serverUrl}
                    onChange={handleUrlChange}
                    style={{textAlign: 'right' }}
                    TextFieldWidth="550px"
                />
                <span/>
                <Button text='Save' sx={{width:'120px'}} onClick={onSave}/>
            </div>
            <h2 style={{marginTop: '25px'}}>Code in your webpage</h2>
            <div className={styles.informativeBlock}>
                <p className={styles.content}>
                    Code snippet to copy in your web page between {"<head>"} and {"</head>"}. Make sure you edit the API URL.
                </p>
                <ContentCopyOutlinedIcon style={{ cursor: 'pointer', fontSize: '20px', color: 'var(--main-text-color)' }} />
            </div>


            <pre><code>
                {`<!-- Client-side HTML/JS Snippet to be integrated into their website -->
<script>
    (function() {
      const apiKey = '${apiKey}';
      const apiUrl = '${serverUrl}';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: apiKey })
      })
      .then(response => response.json())
      .then(data => {
        const script = document.createElement('script');
        script.src = 'https://onboarding-demo.bluewavelabs.ca/api/scripts/popupRenderer.js?apiKey=' + apiKey;
        script.type = 'module';
        script.onload = () => {
          import('https://onboarding-demo.bluewavelabs.ca/api/scripts/popupRenderer.js?apiKey=' + apiKey)
            .then(module => {
              module.default(data.popupData);
            });
        };
        document.head.appendChild(script);
      })
      .catch(error => console.error('Error fetching onboarding data:', error));
    })();
</script>`}
            </code></pre>
        </section>
    )
}

export default CodeTab;