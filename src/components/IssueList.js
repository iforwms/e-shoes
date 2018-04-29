import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Issue from './Issue'

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

    render() { 
        let { repo, issues } = this.props;

        return ( 
            <div className="mx-2 mb-8" style={{flexBasis: '420px'}}>
                <div className="rounded shadow overflow-hidden">
                    <div className="flex flex-col items-center justify-between border-b-2 border-grey-dark p-4 bg-grey">
                        <h3 className="text-lg mb-4 text-grey-darkest font-normal whitespace-no-wrap">
                            {_.startCase(repo)} ({issues.length})
                        </h3>
                        
                        <div className="flex w-full flex-no-wrap">
                            <input 
                                type="text" 
                                value={this.state.newIssue} 
                                onChange={ (e) => this.setState({ newIssue: e.target.value}) } 
                                className="flex-1 p-2 text-sm mx-2 rounded"
                            />

                            <button 
                                data-issue={this.state.newIssue}
                                data-url={issues[0].repository_url}
                                className="rounded text-sm py-1 px-2 bg-grey-darker hover:bg-grey-darkest text-white" 
                                onClick={this.createNewIssue}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    { issues.map(issue => <Issue key={issue.id} issue={issue} markComplete={this.props.markComplete}/> ) }                 
                </div>
            </div>
         )
    }
}

IssueList.propTypes = {
    repo: PropTypes.string,
    issues: PropTypes.array,
    markComplete: PropTypes.func,
    newIssue: PropTypes.func,
}
 
export default IssueList;