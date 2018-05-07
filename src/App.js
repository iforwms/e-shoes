import React, { Component } from 'react'
import axios from 'axios'
import { Spinner } from './components/spinners'
// import Icon from './components/Icon'

import Nav from './components/Nav'
import Repo from './components/Repo'

import './index.css';

axios.defaults.headers.common['Authorization'] = `token ${process.env.REACT_APP_GITHUB_PERSONAL_KEY}`

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            loaded: false,
            issues: [],
            filter: '',
        };

        // this.fetchRepos = this.fetchRepos.bind(this);
        // this.newIssue = this.newIssue.bind(this);
    }

    componentDidMount() {
        this.fetchRepos();
    }

    // markComplete(e) {
    //     this.setState({ loaded: false });

    //     axios.patch(e.target.value, { state: 'closed' })
    //     .then(() => {
    //         this.fetchRepos();
    //     }, error => {
    //         console.error(error);

    //         this.setState({ loaded: false });
    //     });
    // }

    // newIssue(e) {
    //     this.setState({ loaded: false });
        
    //     const issue = e.target.dataset.issue;
    //     const url = e.target.dataset.url + '/issues';

    //     if(issue === '') return;

    //     axios.post(url, { title: issue })
    //     .then(() => {
    //         this.fetchIssues();
    //     }, error => {
    //         console.error(error);

    //         this.setState({ loaded: false });
    //     });
    // }

    fetchRepos() {
        this.setState({ loaded: false });

        axios.get('https://api.github.com/user/repos')
        .then(({ data }) => {
            console.log(data);

            this.setState({ repos: data, loaded: true });
        }, error => {
            console.error(error);

            this.setState({ loaded: true });
        });

        // data.forEach(repo => {
        //     axios.get(repo.url + '/issues')
        //         .then(({ data }) => {
        //             console.log(data);
        //         });
        // });
        // axios.get('https://api.github.com/issues?filter=all&per_page=100?timestamp=' + Date.now())
        // .then(({ data }) => {
        //     // let data = apiResponse;
        //     let repoGroup = _.groupBy(data, (issue) => issue.repository.name);

        //     let repos = [];

        //     _.each(repoGroup, (repo) => {
        //         let issues = [];

        //         _.each(repo, (issue) => {
        //             issues.push(issue);
        //         });
            
        //         repos.push(issues);
        //     });

        //     this.setState({ issues: apiResponse, repos: repos, loaded: true });
        // }, error => {
        //     console.error(error);
            
        //     this.setState({ loaded: true });
        // });        

    }

    render() {
        if(! this.state.loaded) {
            return (
                <div className="flex min-h-screen justify-center items-center bg-grey-dark">
                    <Spinner size="6" />
                </div>
            )
        }

        return (
            <div>
                <Nav/>

                <div style={{ paddingTop: '66px' }}>
                    <div className="p-2 md:p-4">
                        { this.state.repos.map((repo, index) => {
                            return (
                                <Repo
                                    key={index}
                                    repo={repo}
                                />
                            )
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
