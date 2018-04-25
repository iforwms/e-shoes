import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'

class Issue extends Component {
    markComplete(e) {
        let data = _.split(e.target.value, ',');

        axios.patch(`https://api.github.com/repos/${data[0]}/${data[1]}/issues/${data[2]}`, { state: 'closed' });
    }

    render() { 
        let { issue } = this.props;

        return ( 
            <div className="flex items-center p-4 bg-grey-lighter hover:bg-grey-lightest text-grey-darker border-b border-grey-light">
                <div>
                    <input 
                        type="checkbox" 
                        value={[issue.user.login, issue.repository.name, issue.number]} 
                        onChange={ (e) => this.markComplete(e)}
                    />
                </div>

                <div className="ml-4 flex flex-col">
                    <span className={`mb-1 ${issue.assignee && issue.assignee.login === 'iforwms' ? 'text-grey-darkest' : 'text-grey-dark'}`}>{issue.title}</span>

                    { issue.body ? <span className="text-xs mb-2">{issue.body}</span> : '' }

                    <span className="text-xs text-grey-dark">
                        <a className="text-grey-dark hover:text-grey-darkest" href={issue.html_url}>#{issue.number}</a> opened ({moment(issue.created_at).fromNow()}) by <a href={issue.user.html_url} className="text-grey-dark hover:text-grey-darkest">{issue.user.login}</a>
                    </span>
                </div>
            </div>
         )
    }
}

Issue.propTypes = {
    issue: PropTypes.object
}
 
export default Issue