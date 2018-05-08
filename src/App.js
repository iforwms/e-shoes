import React, { Component } from 'react'
import axios from 'axios'
import { Spinner } from './components/spinners'
// import Icon from './components/Icon'

import Nav from './components/Nav'
import RepoIndex from './components/RepoIndex'

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

                <RepoIndex repos={this.state.repos}/>
            </div>
        );
    }
}

export default App;
