import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class LinksListFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }

  componentDidMount() {
    this.checkboxTracker = Tracker.autorun(() => {
      const showVisible = Session.get('showVisible');
      this.setState({ showVisible });
    });
  }

  componentWillUnmount() {
    this.checkboxTracker.stop();
  }

  render() {
    return(
      <div>
        <label>
          <input 
            type="checkbox" 
            onChange={(e) => Session.set('showVisible', !e.target.checked)}
            checked={!this.state.showVisible}
          />
          show hidden links
        </label>
      </div>
    );
  }

} 