import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Icon from './Icon'
import axios from 'axios'
import marked from 'marked'
import Modal from 'react-modal'

import { Spinner } from './spinners'
import Issue from './Issue'

class Repo extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            newIssue: '',
            issues: [],
            loaded: false,
            showIssues: true,
            showAll: true,
            showModal: false,
            modalContent: null,
            readme: null,
         };

        this.createNewIssue = this.createNewIssue.bind(this);
        this.fetchIssues = this.fetchIssues.bind(this);
        this.showReadme = this.showReadme.bind(this);
        this.markComplete = this.markComplete.bind(this);
        this.showBody = this.showBody.bind(this);        
    }

    createNewIssue(e) {
        this.setState({ loaded: false });
        
        const issue = e.target.dataset.issue;
        const url = e.target.dataset.url + '/issues';

        if(issue === '') return;

        axios.post(url, { title: issue })
        .then(() => {
            this.fetchIssues();

            this.setState({ newIssue: '', loaded: true });
        }, error => {
            console.error(error);

            this.setState({ loaded: true });
        });

    }

    componentDidMount() {
        if (this.props.repo.open_issues_count) {
            this.fetchIssues();
        } else {
            this.setState({ loaded: true });
        }
    }

    
    markComplete(e) {
        this.setState({ loaded: false });

        axios.patch(e.target.value, { state: 'closed' })
        .then(() => {
            this.fetchIssues();
            this.setState({ loaded: true });
        }, error => {
            console.error(error);

            this.setState({ loaded: true });
        });
    }

    showBody(body) {
        this.setState({ showModal: true, modalContent: body });
    }

    // filterMatches(issue) {
    //     let filter = this.props.filter.toLowerCase();

    //     if (filter === '') {
    //         return true;
    //     }

    //     if (issue.title.toLowerCase().includes(filter) || (issue.body && issue.body.toLowerCase().includes(filter)) || issue.user.login.includes(filter)) {
    //         return true;
    //     }

    //     return false;
    // }

    showReadme() {
        if(this.state.readme) {
            return this.setState({ showModal: true, modalContent: this.state.readme });
        }

        axios.get(this.props.repo.url + '/readme')
            .then(({ data }) => {
                let readme = atob(data.content);

                this.setState({ showModal: true, readme: readme, modalContent: readme });
            }, error => {
                this.setState({ showModal: true, readme: 'No readme file.', modalContent: 'No readme file.' });
                console.error(error);
            });
    }

    fetchIssues() {
        this.setState({ loaded: false });

        axios.get(this.props.repo.url + '/issues')
            .then(({ data }) => {
                this.setState({ issues: data, loaded: true });
            }, error => {
                console.error(error);

                this.setState({ loaded: true });
            });
    }

    render() { 
        let { repo, visible } = this.props;
        let { issues } = this.state;

        return ( 
            <div className={`${visible ? 'flex' : 'hidden'} flex-col mb-4 border-b-2 border-grey-dark`}>
                
                <div className={`flex rounded rounded-b-none items-center justify-between p-2 bg-grey`}>
                    <h3 className="text-sm mr-2 flex-1 text-grey-darkest font-normal whitespace-no-wrap">
                        <Icon size="13" icon={repo.private ? 'lock' : 'unlock'} />

                        <a
                            className="text-grey-darkest hover:text-grey-dark mx-2"
                            href={repo.html_url}
                            target="_blank"
                        >
                            {_.startCase(repo.name)}
                        </a>

                        <span>({issues.length})</span>
                        
                        <span 
                            className="cursor-pointer text-grey-darkest ml-2" 
                            onClick={ () => this.setState(prevState => ({ showIssues: !prevState.showIssues })) }>
                            <Icon size="22" icon={this.state.showIssues ? 'show' : 'hide'}/>
                        </span>
                        
                        <span 
                            className="cursor-pointer text-grey-darkest ml-2" 
                            onClick={ () => this.setState(prevState => ({ showAll: !prevState.showAll })) }>
                            <Icon size="18" icon={this.state.showAll ? 'users' : 'user'}/>
                        </span>
                        
                        <span 
                            className="cursor-pointer text-grey-darkest ml-2" 
                            onClick={this.showReadme}>
                            <Icon size="18" icon="book"/>
                        </span>
                        
                        <span 
                            className="cursor-pointer text-grey-darkest ml-2" 
                            onClick={this.fetchIssues}
                        >
                            <Icon size="18" icon="refresh"/>
                        </span>
                    </h3>

                    <div className="flex flex-1">
                        <input
                            type="text"
                            value={this.state.newIssue}
                            onChange={(e) => this.setState({ newIssue: e.target.value })}
                            className="flex-1 p-1 text-sm rounded rounded-r-none"
                        />

                        <button
                            data-issue={this.state.newIssue}
                            className="rounded rounded-l-none text-xs py-1 px-2 bg-grey-darker hover:bg-grey-darkest text-white"
                            onClick={this.createNewIssue}
                        >
                            Add
                        </button>
                    </div>
                </div>

                { 
                    this.state.loaded ?
                    <div className={this.state.showIssues ? 'block' : 'hidden'}>
                        {issues.map(issue => {
                            return (
                                <Issue 
                                    key={issue.id} 
                                    issue={issue} 
                                    markComplete={this.markComplete} 
                                    visible={this.state.showAll ? true : issue.assignee && issue.assignee.login === process.env.REACT_APP_GITHUB_USERNAME}
                                    showBody={this.showBody}
                                />
                            )
                        })} 
                    </div> :
                    <div className="p-8 bg-grey-lighter">
                        <Spinner dark size="3"/>
                    </div>
                }

                <Modal 
                    isOpen={this.state.showModal} 
                    ariaHideApp={false}
                    style={{ overlay: { top: '64px' }}}
                >
                    <div className="relative">
                        <button className="absolute pin-t pin-r -mt-8" onClick={ () => this.setState({ showModal: false }) }><Icon icon="close"/></button>

                        {
                            this.state.modalContent ?
                            <span className="container m-auto block mt-8" dangerouslySetInnerHTML = {{__html:marked(this.state.modalContent)}}/> : ''
                        }
                        
                    </div>
                </Modal>           
            </div>
         )
    }
}

Repo.propTypes = {
    repo: PropTypes.object,
    visible: PropTypes.bool,
}
 
export default Repo;