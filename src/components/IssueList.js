import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Issue from './Issue'

class IssueList extends Component {
    render() { 
        let { repo, issues } = this.props;

        return ( 
            <div className="w-1/4 m-2">
                <h3 className="mb-2 text-2xl text-grey font-normal">{_.startCase(repo)} ({issues.length})</h3>

                <div className="mb-8">
                    { issues.map(issue => <Issue key={issue.id} issue={issue}/> ) }                 
                </div>
            </div>
         )
    }
}

IssueList.propTypes = {
    repo: PropTypes.string,
    issues: PropTypes.array,
}
 
export default IssueList;