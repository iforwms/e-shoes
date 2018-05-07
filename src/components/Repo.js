import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Icon from './Icon'

class Repo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {  };
        
        console.log(props);

        if(props.repo.open_issues_count) {
            this.fetchIssues();
        }
    }

    fetchIssues() {
        console.log('Fetching issues: ', this.props.repo.url + '/issues');
    }

    render() { 
        let { repo } = this.props;

        return ( 
            <div style={{ maxWidth: '450px' }} className="mb-4 flex rounded items-center justify-between border-b-2 border-grey-dark p-4 bg-grey">
                <h3 className="text-lg mr-4 flex-1 text-grey-darkest font-normal whitespace-no-wrap">
                    <Icon size="15" icon={repo.private ? 'lock' : 'unlock'} />

                    <a
                        className="text-grey-darkest hover:text-grey-dark mx-2"
                        href={repo.html_url}
                    >
                        {_.startCase(repo.name)}
                    </a>

                    <span>({repo.open_issues_count})</span>
                </h3>

                <div className="flex flex-1">
                    <input
                        type="text"
                        value={this.state.newIssue}
                        onChange={(e) => this.setState({ newIssue: e.target.value })}
                        className="flex-1 p-2 text-sm rounded rounded-r-none"
                    />

                    <button
                        data-issue={this.state.newIssue}
                        data-url={repo.url}
                        className="rounded rounded-l-none text-sm py-1 px-2 bg-grey-darker hover:bg-grey-darkest text-white"
                        onClick={this.createNewIssue}
                    >
                        Add
                        </button>
                </div>
            </div>
         )
    }
}

Repo.propTypes = {
    repo: PropTypes.object
}
 
export default Repo;