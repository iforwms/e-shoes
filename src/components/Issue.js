import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment'

class Issue extends Component {
    render() { 
        let { issue, visible } = this.props;

        return ( 
            <div className={`items-center p-4 bg-grey-lighter hover:bg-grey-lightest text-grey-darker border-b border-grey-light ${visible ? 'flex' : 'hidden'}`}>
                <div>
                    <input 
                        type="checkbox" 
                        value={issue.url} 
                        onChange={ (e) => this.props.markComplete(e)}
                    />
                </div>

                <div className="ml-4 flex flex-col">
                    <span 
                        className={`mb-2 flex items-end ${issue.assignee && issue.assignee.login === 'iforwms' ? 'text-grey-darkest' : 'text-grey-dark'}`}
                    >
                        <span>{issue.title}</span>

                        { issue.labels.map(label => 
                            <span className="inline-block whitespace-no-wrap p-1 ml-2 text-xs text-grey-darkest rounded" style={{backgroundColor: `#${label.color}`}} key={label.id}>{label.name}</span>)
                        }
                    </span>

                    { issue.body ? <span className="leading-tight text-xs mb-2">{issue.body}</span> : '' }

                    <span className="text-xs text-grey-dark">
                        <a className="text-grey-dark hover:text-grey-darkest" href={issue.html_url}>#{issue.number}</a> opened ({moment(issue.created_at).fromNow()}) by <a href={issue.user.html_url} className="text-grey-dark hover:text-grey-darkest">{issue.user.login}</a>
                    </span>
                </div>
            </div>
         )
    }
}

Issue.propTypes = {
    issue: PropTypes.object,
    markComplete: PropTypes.func,
}
 
export default Issue