import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Issue from './Issue'
import Icon from './Icon'

class IssueList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newIssue: '',
        };

        this.createNewIssue = this.createNewIssue.bind(this);
    }

    createNewIssue(e) {
        this.props.newIssue(e);

        this.setState({ newIssue: '' });
    }

    filterMatches(issue) {
        let filter = this.props.filter.toLowerCase();

        if(filter === '') {
            return true;
        }

        if(issue.title.toLowerCase().includes(filter) || (issue.body && issue.body.toLowerCase().includes(filter)) || issue.user.login.includes(filter)) {
            return true;
        }

        return false;
    }

    render() { 
        let { repo, issues } = this.props;

        return ( 
            <div className="mx-2 mb-4" style={{maxWidth: 'calc(100% - 1em)', width: '355px'}}>
                <div className="rounded shadow overflow-hidden">
                    <div className="flex flex-col items-center justify-between border-b-2 border-grey-dark p-4 bg-grey">
                        <h3 className="text-lg mb-4 text-grey-darkest font-normal whitespace-no-wrap">
                            <Icon size="15" icon={issues[0].repository.private ? 'lock' : 'unlock'}/>

                            <a 
                                className="text-grey-darkest hover:text-grey-dark mx-2" 
                                href={issues[0].repository.html_url}
                            >
                                {_.startCase(repo)}
                            </a>

                            <span>({issues[0].repository.open_issues_count})</span>
                        </h3>
                        
                        <div className="flex w-full flex-no-wrap">
                            <input 
                                type="text" 
                                value={this.state.newIssue} 
                                onChange={ (e) => this.setState({ newIssue: e.target.value}) } 
                                className="flex-1 p-2 text-sm rounded rounded-r-none"
                            />

                            <button 
                                data-issue={this.state.newIssue}
                                data-url={issues[0].repository_url}
                                className="rounded rounded-l-none text-sm py-1 px-2 bg-grey-darker hover:bg-grey-darkest text-white" 
                                onClick={this.createNewIssue}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    { issues.map(issue => {
                        if(this.filterMatches(issue)) {
                            return (
                                <Issue key={issue.id} issue={issue} markComplete={this.props.markComplete}/> 
                            )
                        }

                        return null;
                    }) }                 
                </div>
            </div>
         )
    }
}

IssueList.propTypes = {
    repo: PropTypes.string,
    filter: PropTypes.string,
    issues: PropTypes.array,
    markComplete: PropTypes.func,
    newIssue: PropTypes.func,
}
 
export default IssueList;