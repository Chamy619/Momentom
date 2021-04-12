import React from 'react';
import Input from '@material-ui/core/Input';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        return (
            <form className="searchBar" onSubmit={this.handleSubmit}>
                <Input placeholder="Enter TODO" type="text" fullWidth={true} inputProps={{ style: { textAlign: 'center' } }} value={this.state.inputValue} onChange={this.handleChange} />
            </form>
        );
    }
}

export default SearchBar;