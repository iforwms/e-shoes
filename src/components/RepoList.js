import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RepoList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            tag: 'active',
            visibleRepos: [],
         };

         this.showAll = this.showAll.bind(this);
         this.showActive = this.showActive.bind(this);
         this.showNone = this.showNone.bind(this);
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
            <div className="p-2 text-grey-dark">
                <div className="flex flex-col text-sm mb-2">
                    {/* <input className="p-2 w-full rounded mb-2 border" type="text" placeholder="Filter repos"/> */}
                    <div className="flex">
                        <span onClick={this.showAll} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'all' ? 'bg-orange text-white border-orange' : ''}`}>All</span>
                        <span onClick={this.showNone} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'none' ? 'bg-orange text-white border-orange' : ''}`}>None</span>
                        <span onClick={this.showActive} className={`cursor-pointer rounded hover:bg-orange hover:border-orange hover:text-white mr-1 p-1 border ${this.state.tag === 'active' ? 'bg-orange text-white border-orange' : ''}`}>Active</span>
                    </div>
                </div>

                {this.props.repos.map((repo, index) => (
                    <span 
                        key={index}
                        className="block mb-2 text-sm" 
                    >
                        {repo.full_name} 
                        <input className="ml-2" type="checkbox" checked={this.state.visibleRepos.includes(repo.id)} onClick={ () => this.toggleVisibility(repo.id)}/>
                    </span>
                ))}
            </div>
         )
    }
}

RepoList.propTypes = {
    repos: PropTypes.array
}
 
export default RepoList;