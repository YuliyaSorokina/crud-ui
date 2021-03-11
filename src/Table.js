import React from 'react';
import axios from 'axios'
import TableService from './TableService'

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        };
        this.addNewRecord = this.addNewRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        TableService.getRecords().then(res => this.setState({rows: res.data}))
    }

    addNewRecord() {
        let currentRecord = this.state;
        currentRecord.rows.push({
            _id: '6047365bae66af078a510r45',
            data: {name: 'Bruce', age: 49, email: 'king@king.com'}
        });
        this.setState(currentRecord);
    }

    deleteRecord(id) {
        TableService.deleteRecord(id)
            .then(res => {
                this.setState({rows: this.state.rows.filter(rows => rows._id !== id)});
            })
            .catch(reason => {
                console.error(reason)
            });
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
                            <td>
                                <button onClick={() => this.deleteRecord(item._id)}>Удалить</button>
                            </td>
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