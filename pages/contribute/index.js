import React, { Component, PropTypes } from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';

import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';
import prScreenshot from '../../static/assets/contribute/pr-screenshot.png';

import { guideEditBaseUrl } from '../../config';

import './style.scss';

export const LocalStorageKey = 'contribute-do-not-show-again';

class ContributePgae extends Component {
  constructor(props) {
    super(props);

    this.onRedirectButtonClick = this.onRedirectButtonClick.bind(this);
    this.onDoNotShowAgainToggleValueChange
      = this.onDoNotShowAgainToggleValueChange.bind(this);

    // restore do not show again button state
    let defaultDoNotShowAgain = false;
    try {
      defaultDoNotShowAgain
        = window.localStorage.getItem(LocalStorageKey) === 'true';
    } catch (e) {
      // skip, maybe it is under server rendering
    }

    this.state = {
      doNotShowAgain: defaultDoNotShowAgain,
    };
  }

  componentWillMount() {
    const { router } = this.props;
    const { query } = router.location;

    if (!query || !query.file) {
      router.replace('/');
      return;
    }

    this.setState({
      redirectFilePath: query.file,
    });
  }

  onRedirectButtonClick() {
    const { doNotShowAgain, redirectFilePath } = this.state;

    try {
      window.localStorage.setItem(LocalStorageKey, doNotShowAgain);
      window.location = `${guideEditBaseUrl}${redirectFilePath}`;
    } catch (e) {
      // skip, maybe it is under server rendering
      return;
    }
  }

  onDoNotShowAgainToggleValueChange(event) {
    this.setState({
      doNotShowAgain: event.target.checked,
    });
  }

  render() {
    return (
      <section className="contribute-page">
        <Banner>
          <Header>
            <HeaderNav
              href="/api-reference/"
              img={apiRefIcon}
              text="API reference"
            />
            <HeaderNav
              href="/support/"
              img={supportIcon}
              text="Support"
            />
          </Header>
        </Banner>
        <div className="content">
          <h1>Contributing to the Skygear guides</h1>
          <h2>Thanks for your ♥ for Skygear</h2>
          <hr />
          <p>
            You're seeing this page most probably because you want to make edit
            to the Skygear doc. We're thrilled to have your input!
          </p>
          <p>There's a few things you need to know:</p>
          <ol>
            <li>
              We use Github to organise the Skygear guides in Markdown format.
            </li>
            <li>
              You can make direct edits to the guides on GitHub. We'll direct
              you to the Markdown file of the guide you're currently visiting.
            </li>
            <li>
              <span>
                When you're done editing, submit a Pull Request at the bottom
                of the page.
              </span>
              <img src={prScreenshot} alt="Pull Request Screen Shot" />
            </li>
            <li>
              Our editor will review your Pull Request with 2 days. He will
              notify you the status of the PR after the review.
            </li>
            <li>
              If you have any suggestion for the guides but it's too complex
              for quick edit,&nbsp;
              <a
                href="https://github.com/SkygearIO/guides/issues/new"
                target="_blank"
              >
                open an issue
              </a>
              &nbsp;instead.
            </li>
          </ol>
          <p>Thanks again for contributing!</p>
          <button onClick={this.onRedirectButtonClick}>
            Make Changes Now
          </button>
          <div className="input-group">
            <input
              type="checkbox"
              id="do-not-show-again"
              onChange={this.onDoNotShowAgainToggleValueChange}
              checked={this.state.doNotShowAgain}
            />
            <label htmlFor="do-not-show-again">
              Don't show this page again next time.
            </label>
          </div>
        </div>
      </section>
    );
  }
}

ContributePgae.propTypes = {
  // routes: PropTypes.arrayOf(PropTypes.object),
  router: PropTypes.object,
};

export default ContributePgae;
