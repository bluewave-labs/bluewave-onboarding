import React, { useState, useEffect } from "react";
import styles from "./CodeTab.module.css";
import CustomTextField from "@components/TextFieldComponents/CustomTextField/CustomTextField";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from "@components/Button/Button";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { generateApiKey } from "../../../utils/generalHelper";
import { emitToastError } from "../../../utils/guideHelper";
import { setConfig, getConfig } from '../../../services/teamServices';
import toastEmitter, { TOAST_EMITTER_KEY } from "../../../utils/toastEmitter";
import { URL_REGEX } from "../../../utils/constants";

const CodeTab = () => {
    const [apiKey, setApiKey] = useState('')
    const [serverUrl, setServerUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const validateServerUrl = url => {
        const errors = [];

        if (url === "") {
            return { valid: true, errors: null };
        }

        if (!URL_REGEX.PROTOCOL.test(url)) {
            errors.push("Invalid or missing protocol (must be 'http://' or 'https://').")
        }

        const domainMatch = url.match(URL_REGEX.DOMAIN);
        if (!domainMatch) {
            errors.push("Invalid domain name (must include a valid top-level domain like '.com').");
        } else {
            const domain = domainMatch[1];
            if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
                errors.push(`Malformed domain: '${domain}'.`);
            }
        }

        if (errors.length === 0) {
            return { valid: true, errors: null }
        }

        return { valid: false, errors }
    };

    useEffect(() => {
        const getServerUrlAndApiKey = async () => {
            try {
                const { serverUrl, apiKey } = await getConfig();
                setServerUrl(serverUrl);
                setApiKey(apiKey);
            } catch (err) {
                console.error('Error fetching server url and api key: ', err);
            }
        }
        getServerUrlAndApiKey();
    }, [])

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
        const { valid, errors } = validateServerUrl(serverUrl);

        if (!valid) {
            errors.forEach(err => {
                toastEmitter.emit(TOAST_EMITTER_KEY, err);
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await setConfig(serverUrl, apiKey);
            toastEmitter.emit(TOAST_EMITTER_KEY, response.message);
        } catch (err) {
            emitToastError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <h2>API key management</h2>
            <p className={styles.content}>Manage the key that Onboarding app uses to authenticate the agent code.</p>

            {/* api key */}
            <div className={styles.block}>
                <p style={{ marginRight: '2rem' }}>API key:</p>
                <CustomTextField
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    style={{ textAlign: 'right' }}
                    TextFieldWidth="550px"
                />
                <DeleteOutlinedIcon onClick={deleteApiKey} style={{ cursor: 'pointer', fontSize: '24px', color: 'var(--main-text-color)' }} />
                <Button text='Regenerate' onClick={() => setApiKey(generateApiKey())} sx={{ width: '120px' }} />
            </div>
            {/* server url */}
            <div className={styles.block}>
                <p className={styles.label}>Server URL:</p>
                <CustomTextField
                    value={serverUrl}
                    onChange={handleUrlChange}
                    style={{ textAlign: 'right' }}
                    TextFieldWidth="550px"
                />
                <span />
                <Button text='Save' sx={{ width: '120px' }} onClick={onSave} />
            </div>
            <h2 style={{ marginTop: '25px' }}>Code in your webpage</h2>
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

                            var s=document.createElement("script");
                            s.type="text/javascript";
                            s.async=false;
                            s.onerror=()=>{console.log("onboard not loaded");};
                            s.src = 'http://localhost:8082/main.js=${apiKey}';
                            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(script);
                        })();
                    </script>
                `}
            </code></pre>
        </section>
    )
}

export default CodeTab;