import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'
import axios from 'axios'
import marked from 'marked'
import Modal from 'react-modal'

import Icon from './Icon'

class Issue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collaborators: [],
            viewCollaborators: false,
            loaded: true,
            showModal: false,
        }

        this.fetchCollaborators = this.fetchCollaborators.bind(this);
        this.assignUser = this.assignUser.bind(this);
    }

    fetchCollaborators () {
        axios.get(this.props.issue.repository_url + '/collaborators')
            .then(({ data }) => {
                this.setState({ collaborators: data });
            }, error => {
                console.error(error);
            });
    }

    showCollaborators() {
        if(! this.state.collaborators.length) {
            this.fetchCollaborators();
        }

        this.setState({ viewCollaborators: true });
    }

    assignUser(user) {
        this.setState({ loaded: false });

        axios.post(`${this.props.issue.url}/assignees`, { assignees: user.login })
            .then(() => {
                this.setState({ loaded: true, viewCollaborators: false });
            }, error => {
                console.error(error);

                this.setState({ loaded: true });
            });
    }

    render() { 
        let { issue, visible } = this.props;

        return ( 
            <div className={`items-center justify-between p-4 bg-grey-lighter hover:bg-grey-lightest text-grey-darker border-b border-grey-light ${visible ? 'flex' : 'hidden'}`}>
                <div>
                    <input 
                        type="checkbox" 
                        value={issue.url} 
                        onChange={ (e) => this.props.markComplete(e)}
                    />
                </div>

                <div className="ml-4 flex flex-col flex-1">
                    <span 
                        className={`mb-2 flex items-end text-grey-darkest`}
                    >
                    { 
                        issue.body ? 
                        <span
                            onClick={() => this.setState({ showModal: true })}
                            className="cursor-pointer underline hover:text-orange"
                        >
                            {issue.title}
                        </span> :
                        <span>{issue.title}</span>
                    }

                        { issue.labels.map(label => 
                            <span className="inline-block whitespace-no-wrap p-1 ml-2 text-xs text-grey-darkest rounded" style={{backgroundColor: `#${label.color}`}} key={label.id}>{label.name}</span>)
                        }

                        { issue.assignees.map((user, index) => (
                            <span key={index} className="ml-2">
                                <img className="block rounded" width="25" height="25" src={user.avatar_url} alt={`Avatar for ${user.login}`}/>
                            </span>
                        ))}
                    </span> 

                    <span className="text-xs text-grey-dark">
                        <a className="text-grey-dark hover:text-grey-darkest" target="_blank" href={issue.html_url}>#{issue.number}</a> opened ({moment(issue.created_at).fromNow()}) by <a href={issue.user.html_url} target="_blank" className="text-grey-dark hover:text-grey-darkest">{issue.user.login}</a>
                    </span>
                </div>

                <div className="relative">
                    <span className="text-sm cursor-pointer" onClick={ () => this.showCollaborators() }>
                        <Icon icon="user-add"/>
                    </span>

                    <div 
                        className={`p-1 absolute pin-t pin-r border rounded bg-white z-10 ${this.state.viewCollaborators ? 'block' : 'hidden'}`}
                        style={{ width: '90px' }}
                    >
                        <span className="cursor-pointer text-right block mb-2" onClick={ () => this.setState({ viewCollaborators: false }) }>
                            <Icon icon="close" size="12"/>
                        </span>

                        {this.state.collaborators.map((user, index) => (
                            <span className="cursor-pointer block mb-1" key={index} onClick={ () => this.assignUser(user) }>
                                <img className="block" src={user.avatar_url} alt={`Avatar for ${user.login}`}/>
                            </span>
                        ))}
                    </div>
                </div>

                {
                    issue.body ?
                    <Modal 
                        isOpen={this.state.showModal} 
                        ariaHideApp={false}
                        style={{ overlay: { top: '64px' }}}
                    >
                        <div className="relative">
                            <button className="absolute pin-t pin-r -mt-8" onClick={ () => this.setState({ showModal: false }) }><Icon icon="close"/></button>
                            <span className="container m-auto block mt-8" dangerouslySetInnerHTML = {{__html:marked(issue.body)}}/>
                        </div>
                    </Modal> : ''
                }
            </div>
        )
    }
}

Issue.propTypes = {
    issue: PropTypes.object,
    markComplete: PropTypes.func,
    visible: PropTypes.bool,
}
 
export default Issue