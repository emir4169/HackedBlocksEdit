import React from 'react';
import {FormattedMessage} from 'react-intl';
import cloudIcon from './clouddata.svg';
import styles from './cloud-variable-badge.css';

const CloudVariableBadge = () => (
    <div className={styles.badge}>
        <div className={styles.icon}>
            <img
                src={cloudIcon}
                alt="Cloud"
                width="32"
                height="32"
            />
        </div>
        <div className={styles.text}>
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="This project uses cloud variables. SN-Edit uses its own cloud variable server independent of Scratch. This server isn't exactly the best as its hosted on replit. Expect downtimes. Cloud Variables should not be used for Save Data or Multiplayer. For either of these check the extension store."
                description="Cloud variable information shown under projects with cloud variables"
                id="tw.cloudVariableBadge"
                values={{
                    learnMore: (
                        <a
                            href="https://docs.turbowarp.org/cloud-variables"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FormattedMessage
                                defaultMessage="Learn more."
                                id="gui.alerts.cloudInfoLearnMore"
                            />
                        </a>
                    )
                }}
            />
        </div>
    </div>
);

export default CloudVariableBadge;
