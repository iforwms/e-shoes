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
        // let data = apiResponse;

        axios.get('https://api.github.com/issues?filter=all')
            .then(({ data }) => {
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
            <div>
                <h1 className="fixed w-full shadow p-4 text-xl bg-grey-darkest text-grey-light font-normal">Open Issues</h1>

                <div className="flex p-4" style={{paddingTop: '70px'}}>
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
