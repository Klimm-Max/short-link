import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLinkForm extends React.Component {
  /* This class is providing a button to open/close a modal.
  *  The modal consists of a form to submit new links to the DB.
  *  Errors, the url and the modal state are managed by this classes state. 
  *  For more information about the Modal: https://github.com/reactjs/react-modal */

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const url = this.state.url;
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }

  onChange(e) {
    this.setState({ url: e.target.value.trim() });
  }

  renderError() {
    if (this.state.error) {
      return <p>{this.state.error}</p>
    } 
    return  
  }

  handleModalClose() {
    this.setState({ 
      isOpen: false, 
      url: '', 
      error: '' 
    });
  }

  render() {
    return(
      <div>
        <button onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>

        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          {/* Modal Content when button is clicked */}
          <h1>Add Link</h1>
          {this.renderError()}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input 
              type="text" 
              ref="url" 
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button>Add Link</button>
          </form>
          <button onClick={this.handleModalClose.bind(this)}>
            Cancel
          </button>
          
        </Modal>
      </div>
    );
  }

}