import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import { init} from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class DialogExtension extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  render() {
    return (
      <div style={{ margin: tokens.spacingM }}>
        <Button
          testId="close-dialog"
          buttonType="muted"
          onClick={() => {
            this.props.sdk.close('data from modal dialog');
          }}>
          Close modal
        </Button>
      </div>
    );
  }
}

export class SidebarExtension extends React.Component {

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  }

  onButtonClick = async () => {
    const result = await this.props.sdk.dialogs.openExtension({
      width: 800,
      title: 'The same extension rendered in modal window'
    });
    console.log(result);
  };

  render() {
    return (
      <Button
        buttonType="positive"
        isFullWidth={true}
        testId="open-dialog"
        onClick={this.onButtonClick}>
        Publish Site
      </Button>
    );
  }
}

export const initialize = sdk => {
    ReactDOM.render(<SidebarExtension sdk={sdk} />, document.getElementById('root'));
};

init(initialize);
