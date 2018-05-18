import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Repo from './Repo'
import Icon from './Icon'

class RepoList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            tag: 'active',
            visibleRepos: [],
            filter: '',
         };

         this.showAll = this.showAll.bind(this);
         this.showActive = this.showActive.bind(this);
         this.showNone = this.showNone.bind(this);
         this.filterRepo = this.filterRepo.bind(this);
    }

    componentDidMount() {
        let visible = [];

        this.props.repos.map(repo => {
            if(repo.open_issues_count) {
                visible.push(repo.id);        
            }

            return true;
        });

        this.setState({
            visibleRepos: visible
        });
    }

    showAll() {
        let visible = [];

        this.props.repos.map(repo => {
            visible.push(repo.id);
            
            return true;
        });

        this.setState({ tag: 'all', visibleRepos: visible });
    }

    showActive() {
        let visible = [];

        this.props.repos.map(repo => {
            if(repo.open_issues_count) {
                visible.push(repo.id);
            }
            
            return true;
        });

        this.setState({ tag: 'active', visibleRepos: visible });
    }

    showNone() {
        this.setState({ tag: 'none', visibleRepos: [] });
    }

    filterRepo(repo) {
        if(this.state.filter === '') return true;

        return repo.full_name.toLowerCase().indexOf(this.state.filter.toLowerCase()) > -1;
    }

    toggleVisibility(id) {
        if(this.state.visibleRepos.includes(id)) {
            return this.setState(prevState => ({ 
                tag: null, 
                visibleRepos: prevState.visibleRepos.filter(repo => repo !== id)
            }));
        };
        
        return this.setState(prevState => ({ 
            tag: null, 
            visibleRepos: [...prevState.visibleRepos, id] 
        }));
    }

    render() { 
        return ( 
            <div style={{ paddingTop: '82px' }} className="flex mx-auto px-4 pb-4 min-h-screen justify-center"> 

                <div className="text-grey-dark pr-4 border-r"  
                    style={{ minWidth: '300px' }} >
                    <div className="flex flex-col text-sm mb-2">
                        <div className="flex items-center justify-between mb-2">
                            <input className="p-2 w-full mr-2 rounded border" value={this.state.filter} type="text" onChange={ (e) => this.setState({ filter: e.target.value }) } placeholder="Filter repos"/>

                            <span 
                            className="cursor-pointer" 
                            onClick={ () => this.setState({ filter: '' }) }
                            ><Icon icon="close"/></span>
                        </div>

                        <div className="flex">
                            <span onClick={this.showAll} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'all' ? 'bg-orange text-white border-orange' : ''}`}>All</span>

                            <span onClick={this.showNone} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'none' ? 'bg-orange text-white border-orange' : ''}`}>None</span>

                            <span onClick={this.showActive} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'active' ? 'bg-orange text-white border-orange' : ''}`}>Active</span>
                        </div>
                    </div>

                    {this.props.repos.map((repo, index) => (
                        <span 
                            key={index}
                            className={`block mb-2 text-sm cursor-pointer ${this.filterRepo(repo) ? 'block' : 'hidden'}`}
                            onClick={ () => this.toggleVisibility(repo.id)}
                        >
                            {repo.full_name} ({repo.open_issues_count})
                            <input className="ml-2" type="checkbox" checked={this.state.visibleRepos.includes(repo.id)}/>
                        </span>
                    ))}
                </div>

                <div className="px-4 w-full" style={{ maxWidth: '800px' }}>
                    {this.props.repos.map((repo, index) => (
                        <Repo key={index} repo={repo} filter={this.props.filter} visible={this.state.visibleRepos.includes(repo.id)}/>
                    ))}
                </div>
            </div>
         )
    }
}

RepoList.propTypes = {
    repos: PropTypes.array,
    filter: PropTypes.string,
}
 
export default RepoList;