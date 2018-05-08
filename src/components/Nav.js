import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

class Nav extends Component {
    render() { 
        return ( 
            <div className="flex z-10 items-center justify-between border-l-8 border-orange fixed w-full shadow p-4 bg-grey-darkest">
                <h1 className="whitespace-no-wrap mr-4 sm:mb-0 text-xl text-grey-light font-normal sm:mr-auto">E-shoes</h1>

                <div className="flex w-full sm:w-auto">
                    {/* <div className="flex-1 sm:flex-auto sm:ml-4 mr-4">
                        <input
                            type="text"
                            value={this.props.filter}
                            onChange={(e) => this.props.updateFilter(e.target.value)}
                            className="p-2 w-full rounded"
                            placeholder="Filter issues"
                        />
                    </div> */}

                    <button
                        className="bg-transparent hover:bg-grey-darkest hover:border-grey-dark text-sm text-white hover:text-grey-dark py-1 px-2 border border-white hover:border-transparent rounded"
                        onClick={this.props.fetchRepos}
                    >
                        <Icon icon="refresh" />
                    </button>
                </div>
            </div>
         )
    }
}

Nav.propTypes = {
    fetchRepos: PropTypes.func,
    filter: PropTypes.string,
    updateFilter: PropTypes.func,
}
 
export default Nav;