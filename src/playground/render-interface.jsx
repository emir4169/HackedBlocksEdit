/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';
import {getIsLoading} from '../reducers/project-state.js';
import DOMElementRenderer from '../containers/dom-element-renderer.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import TWThemeHOC from '../lib/tw-theme-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import TWPackagerIntegrationHOC from '../lib/tw-packager-integration-hoc.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import '../lib/tw-fix-history-api';
import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
import FeaturedProjects from '../components/tw-featured-projects/featured-projects.jsx';
import Description from '../components/tw-description/description.jsx';
import WebGlModal from '../containers/webgl-modal.jsx';
import BrowserModal from '../components/browser-modal/browser-modal.jsx';
import CloudVariableBadge from '../components/tw-cloud-variable-badge/cloud-variable-badge.jsx';
import {isRendererSupported, isBrowserSupported} from '../lib/tw-environment-support-prober';
import AddonChannels from '../addons/channels';
import {loadServiceWorker} from './load-service-worker';
import runAddons from '../addons/entry';

import styles from './interface.css';

// if (window.parent !== window) {
//     // eslint-disable-next-line no-alert
//     alert('This page is embedding TurboWarp in a way that is unsupported and will cease to function in the near future. Please read https://docs.turbowarp.org/embedding');
//     throw new Error('Invalid embed');
// }

let announcement = null;
if (process.env.ANNOUNCEMENT) {
    announcement = document.createElement('p');
    // This is safe because process.env.ANNOUNCEMENT is set at build time.
    announcement.innerHTML = process.env.ANNOUNCEMENT;
}

const handleClickAddonSettings = () => {
    const path = process.env.ROUTING_STYLE === 'wildcard' ? 'addons' : 'addons.html';
    window.open(`${process.env.ROOT}${path}`);
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: 'Develop like never before.',
        description: 'Title of homepage',
        id: 'tw.guiDefaultTitle'
    }
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC,
    TWPackagerIntegrationHOC
)(MenuBar);

if (AddonChannels.reloadChannel) {
    AddonChannels.reloadChannel.addEventListener('message', () => {
        location.reload();
    });
}

if (AddonChannels.changeChannel) {
    AddonChannels.changeChannel.addEventListener('message', e => {
        SettingsStore.setStoreWithVersionCheck(e.data);
    });
}

runAddons();

const Footer = () => (
    console.log("footer gone.")
)
    // <footer className={styles.footer}>
    //     <div className={styles.footerContent}>
    //         <div className={styles.footerText}>
    //             <FormattedMessage
    //                 // eslint-disable-next-line max-len
    //                 defaultMessage="TurboWarp is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
    //                 description="Disclaimer that TurboWarp is not connected to Scratch"
    //                 id="tw.footer.disclaimer"
    //             />
    //         </div>
    //         <div className={styles.footerColumns}>
    //             <div className={styles.footerSection}>
    //                 <a href="https://fosshost.org/">
    //                     <FormattedMessage
    //                         defaultMessage="Hosting provided by Fosshost"
    //                         description="Fosshost link in footer"
    //                         id="tw.footer.fosshost"
    //                     />
    //                 </a>
    //                 <a href="credits.html">
    //                     <FormattedMessage
    //                         defaultMessage="Credits"
    //                         description="Credits link in footer"
    //                         id="tw.footer.credits"
    //                     />
    //                 </a>
    //             </div>
    //             <div className={styles.footerSection}>
    //                 <a href="https://desktop.turbowarp.org/">
    //                     {/* Do not translate */}
    //                     {'TurboWarp Desktop'}
    //                 </a>
    //                 <a href="https://packager.turbowarp.org/">
    //                     {/* Do not translate */}
    //                     {'TurboWarp Packager'}
    //                 </a>
    //                 <a href="https://docs.turbowarp.org/embedding">
    //                     <FormattedMessage
    //                         defaultMessage="Embedding"
    //                         description="Menu bar item for embedding link"
    //                         id="tw.footer.embed"
    //                     />
    //                 </a>
    //                 <a href="https://docs.turbowarp.org/url-parameters">
    //                     <FormattedMessage
    //                         defaultMessage="URL Parameters"
    //                         description="Menu bar item for URL parameters link"
    //                         id="tw.footer.parameters"
    //                     />
    //                 </a>
    //                 <a href="https://docs.turbowarp.org/translate">
    //                     <FormattedMessage
    //                         defaultMessage="Help Translate TurboWarp"
    //                         description="Menu bar item for translating TurboWarp link"
    //                         id="tw.footer.translate"
    //                     />
    //                 </a>
    //             </div>
    //             <div className={styles.footerSection}>
    //                 <a href="https://scratch.mit.edu/users/GarboMuffin/#comments">
    //                     <FormattedMessage
    //                         defaultMessage="Feedback & Bugs"
    //                         description="Link to feedback/bugs page"
    //                         id="tw.feedback"
    //                     />
    //                 </a>
    //                 <a href="https://github.com/TurboWarp/">
    //                     <FormattedMessage
    //                         defaultMessage="Source Code"
    //                         description="Link to source code"
    //                         id="tw.code"
    //                     />
    //                 </a>
    //                 <a href="privacy.html">
    //                     <FormattedMessage
    //                         defaultMessage="Privacy Policy"
    //                         description="Link to privacy policy"
    //                         id="tw.privacy"
    //                     />
    //                 </a>
    //             </div>
    //         </div>
    //     </div>
    // </footer>

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
    }
    componentDidUpdate (prevProps) {
        if (prevProps.isLoading && !this.props.isLoading) {
            loadServiceWorker();
        }
    }
    handleUpdateProjectTitle (title, isDefault) {
        if (isDefault || !title) {
            document.title = `SN-Edit - ${this.props.intl.formatMessage(messages.defaultTitle)}`;
        } else {
            document.title = `${title} - SN-Edit`;
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            intl,
            hasCloudVariables,
            description,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            onClickTheme,
            projectId,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;
        return (
            <div
                className={classNames(styles.container, {
                    [styles.playerOnly]: isHomepage,
                    [styles.editor]: isEditor
                })}
            >
                {isHomepage ? (
                    <div className={styles.menu}>
                        <WrappedMenuBar
                            canChangeLanguage
                            canManageFiles
                            enableSeeInside
                            onClickAddonSettings={handleClickAddonSettings}
                            onClickTheme={onClickTheme}
                        />
                    </div>
                ) : null}
                <div
                    className={styles.center}
                    style={isPlayerOnly ? ({
                        // add a couple pixels to account for border (TODO: remove weird hack)
                        width: `${Math.max(640, props.customStageSize.width) + 2}px`
                    }) : null}
                >
                    {isHomepage && announcement ? <DOMElementRenderer domElement={announcement} /> : null}
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onClickTheme={onClickTheme}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                        {...props}
                    />
                    {isHomepage ? (
                        <React.Fragment>
                            {isRendererSupported() ? null : (
                                <WebGlModal isRtl={isRtl} />
                            )}
                            {isBrowserSupported() ? null : (
                                <BrowserModal isRtl={isRtl} />
                            )}
                            <div className={styles.section}>
                                <ProjectInput />
                            </div>
                            {(
                                // eslint-disable-next-line max-len
                                projectId === '0' || description.instructions === 'unshared' || description.credits === 'unshared'
                            ) && (
                                <div className={styles.unsharedUpdate}>
                                    {/* I won't link these in the public website because there will be way */}
                                    {/* too much spam if we do that, but here are the relevant links: */}
                                    {/* https://github.com/LLK/scratch-gui/pull/8269 */}
                                    {/* https://github.com/LLK/scratch-www/pull/6773 */}
                                    <p>
                                        <i>{'Version 2.0.0'}</i>
                                    </p>
                                    <p>
                                        {/* eslint-disable-next-line max-len */}
                                        {"Welcome to the SN-Edit v2 Update. You may have notcied that we look **way** different! Thats because we've moved from our old SheepTester fork to a new Turbowarp fork. Sn-Edit looks different and thats because we've added TONS of new features! We hope that you enjoy this update."}
                                    </p>
                                    <p>
                                        {'For more information, visit '}
                                        <a
                                            href="https://cube-enix.github.io/DevKit.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {'our news page'}
                                        </a>
                                    </p>
                                </div>
                            )}
                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}>
                                    <CloudVariableBadge />
                                </div>
                            )}
                            {description.instructions || description.credits ? (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </div>
                            ) : null}
                            {/*<div className={styles.section}>
                                <FeaturedProjects studio="27205657" />
                            </div> */}
                        </React.Fragment>
                    ) : null}
                </div>
                {/* {isHomepage && <Footer />} */}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    hasCloudVariables: PropTypes.bool,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
    }),
    isFullScreen: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClickTheme: PropTypes.func,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    hasCloudVariables: state.scratchGui.tw.hasCloudVariables,
    customStageSize: state.scratchGui.customStageSize,
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface));

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC('TW Interface'),
    TWProjectMetaFetcherHOC,
    TWStateManagerHOC,
    TWThemeHOC
)(ConnectedInterface);

export default WrappedInterface;
