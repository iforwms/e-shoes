import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

import './index.css';

import { Spinner } from './components/spinners'
import Icon from './components/Icon'
import IssueList from './components/IssueList'

import apiResponse from './stubs/issues'

axios.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_PERSONAL_KEY}`

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            loaded: false,
            issues: [],
            filter: '',
        }

        this.markComplete = this.markComplete.bind(this);
        this.newIssue = this.newIssue.bind(this);
    }

    componentDidMount() {
        this.fetchIssues();
    }

    markComplete(e) {
        this.setState({ loaded: false });

        axios.patch(e.target.value, { state: 'closed' })
        .then(() => {
            this.fetchIssues();
        }, error => {
            console.error(error);

            this.setState({ loaded: false });
        });
    }

    newIssue(e) {
        this.setState({ loaded: false });
        
        const issue = e.target.dataset.issue;
        const url = e.target.dataset.url + '/issues';

        if(issue === '') return;

        axios.post(url, { title: issue })
            .then(() => {
                this.fetchIssues();
            }, error => {
                console.error(error);

                this.setState({ loaded: false });
            });
        
    }

    fetchIssues() {
        this.setState({ loaded: false });
        
        axios.get('https://api.github.com/issues?filter=all')
        .then(({ data }) => {
            // let data = apiResponse;
            let repoGroup = _.groupBy(data, (issue) => issue.repository.name);

            let repos = [];

            _.each(repoGroup, (repo) => {
                let issues = [];

                _.each(repo, (issue) => {
                    issues.push(issue);
                });
            
                repos.push(issues);
            });

            this.setState({ issues: apiResponse, repos: repos, loaded: true });
        }, error => {
            console.error(error);
            
            this.setState({ loaded: true });
        });        

    }

    render() {
        return (
            <div className="font-sans">
                <div className="flex items-center justify-between border-l-8 border-orange fixed w-full shadow p-4 bg-grey-darkest">
                    <h1 className="text-xl text-grey-light font-normal mr-auto">Open Github Issues</h1>

                    <div className="mx-4">
                        <input 
                            type="text" 
                            value={this.state.filter} 
                            onChange={ (e) => this.setState({ filter: e.target.value }) } 
                            className="p-2 rounded" 
                            placeholder="Filter issues"
                        />
                    </div>
                    
                    <button 
                        className="bg-transparent hover:bg-grey-darkest hover:border-grey-dark text-sm text-white hover:text-grey-dark p-2 border border-white hover:border-transparent rounded" 
                        onClick={() => this.fetchIssues()}
                    >
                        <Icon icon="refresh"/>
                    </button>
                </div>

                {
                    ! this.state.loaded ?
                    <div className="flex min-h-screen justify-center items-center bg-grey-dark">
                        <Spinner size="6"/>
                    </div> :

                    <div className="flex flex-wrap justify-around p-1 md:p-4 bg-grey-dark min-h-screen" style={{paddingTop: '100px'}}>
                    {
                        this.state.repos.map((issues, index) => {
                            
                            return (
                                <IssueList 
                                    key={index} 
                                    issues={issues}
                                    newIssue={this.newIssue}
                                    markComplete={this.markComplete}
                                    filter={this.state.filter}
                                    repo={issues[0].repository.name}/>
                            )
                        })
                    }
                    </div> 
                }
                               
            </div>
        );
    }
}

export default App;
