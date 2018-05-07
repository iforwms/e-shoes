import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <div className="flex flex-col sm:flex-row z-10 items-center justify-between border-l-8 border-orange fixed w-full shadow p-4 bg-grey-darkest">
                <h1 className="whitespace-no-wrap mb-4 sm:mb-0 text-xl text-grey-light font-normal sm:mr-auto">Open Github Issues</h1>

                <div className="flex w-full sm:w-auto">
                    <div className="flex-1 sm:flex-auto sm:ml-4 mr-4">
                        <input
                            type="text"
                            value={this.state.filter}
                            onChange={(e) => this.setState({ filter: e.target.value })}
                            className="p-2 w-full rounded"
                            placeholder="Filter issues"
                        />
                    </div>

                    <button
                        className="bg-transparent hover:bg-grey-darkest hover:border-grey-dark text-sm text-white hover:text-grey-dark py-1 px-2 border border-white hover:border-transparent rounded"
                        onClick={() => this.fetchIssues()}
                    >
                        <Icon icon="refresh" />
                    </button>
                </div>
            </div>
         )
    }
}
 
export default Nav;