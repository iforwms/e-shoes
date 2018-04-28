import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import './index.css';

import IssueList from './components/IssueList'

import apiResponse from './stubs/issues'

axios.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_PERSONAL_KEY}`

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: []
        }
    }

    componentDidMount() {
        this.fetchIssues();
    }

    fetchIssues() {
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

            this.setState({ issues: apiResponse, repos: repos });
        });        

    }

    render() {
        return (
            <div className="font-sans">
                <div className="flex items-center justify-between border-l-8 border-orange fixed w-full shadow p-4 bg-grey-darkest">
                    <h1 className="text-xl text-grey-light font-normal">Open Github Issues</h1>
                    
                    <button 
                        className="bg-transparent hover:bg-grey-darkest hover:border-grey-darkest text-sm text-white hover:text-white py-1 px-2 border border-white hover:border-transparent rounded" 
                        onClick={() => this.fetchIssues()}
                    >
                        Refresh
                    </button>
                </div>

                <div className="flex flex-wrap justify-around p-1 md:p-4 bg-grey-dark min-h-screen" style={{paddingTop: '100px'}}>
                {
                    this.state.repos.map((issues, index) => {
                        return (
                            <IssueList 
                                key={index} 
                                issues={issues}
                                repo={issues[0].repository.name}/>
                        )
                    })
                }
                </div>                
            </div>
        );
    }
}

export default App;
