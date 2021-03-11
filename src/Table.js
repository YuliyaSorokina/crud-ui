import React from 'react';
import axios from 'axios'

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        };
        this.addNewRecord = this.addNewRecord.bind(this);
    }

    componentDidMount() {
        axios.get('http://178.128.196.163:3000/api/records')
            .then(response => this.setState({rows: response.data}))
    }

    addNewRecord() {
        let currentRecord = this.state;
        currentRecord.rows.push({_id: '6047365bae66af078a510r45', data: {name: 'Bruce', age: 49, email: 'king@king.com'}});
        this.setState(currentRecord);
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
                        </th>
                        <th>
                            Email
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows.map((item) =>
                        <tr key={item._id}>
                            <td>{item.data.name}</td>
                            <td>{item.data.age}</td>
                            <td>{item.data.email}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <button onClick={this.addNewRecord}>Добавить запись</button>
            </div>
        );
    }
}

export default Table;