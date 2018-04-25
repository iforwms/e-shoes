import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Issue from './Issue'

class IssueList extends Component {
    render() { 
        let { repo, issues } = this.props;

        return ( 
            <div className="mx-2 mb-8" style={{flexBasis: '420px'}}>
                <div className="rounded shadow overflow-hidden">
                    <h3 className="text-xl text-grey-darkest border-b-2 border-grey-dark font-normal p-4 bg-grey">
                        {_.startCase(repo)} ({issues.length})
                    </h3>

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