import React from 'react';
import TableService from './TableService'

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: [],
            // Состояние таблицы. Принимает значения view для просмотра, create во время добавления записи,
            // edit во время редактирования записи
            mode: 'view',
            tempName: undefined,
            tempAge: undefined,
            tempEmail: undefined
        };
        this.setCreateMode = this.setCreateMode.bind(this);
        this.saveRecord = this.saveRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        TableService.getRecords()
            .then(res => this.setState({rows: res.data}))
    }

    setCreateMode() {
        this.setState({mode: 'create'});
    }

    onNameInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    saveRecord() {
        if (!this.state.tempName || !this.state.tempAge || !this.state.tempEmail ) {
            alert("All fields are required");
            return
        }
        let currentRecord = {
            data: {name: this.state.tempName, age: this.state.tempAge, email: this.state.tempEmail}
        };
        TableService.addRecord(currentRecord)
            .then(res => {
                let currentRecord = this.state;
                currentRecord.rows.push(res.data);
                this.setState(currentRecord);
                this.setState({mode: 'view'});
                this.setState({tempName: undefined});
                this.setState({tempAge: undefined});
                this.setState({tempEmail: undefined});
            });
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
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows.map((item) =>
                        <tr key={item._id}>
                            <td>{item.data.name}</td>
                            <td>{item.data.age}</td>
                            <td>{item.data.email}</td>
                            <td>
                                { this.state.mode === 'view' &&
                                <button onClick={() => this.deleteRecord(item._id)}>Delete</button>
                                    }
                            </td>
                        </tr>
                    )}
                    {this.state.mode === 'create' &&
                        <tr>
                            <td><input type="text" name="tempName" placeholder="name"
                                       onChange={(e) => this.onNameInputChange(e)}/></td>
                            <td><input type="text" name="tempAge" placeholder="age"
                                       onChange={(e) => this.onNameInputChange(e)}/></td>
                            <td><input type="text" name="tempEmail" placeholder="email"
                                       onChange={(e) => this.onNameInputChange(e)}/></td>
                            <td>
                                <button onClick={() => this.saveRecord()}>Save</button>
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
                { this.state.mode === 'view' &&
                <button onClick={this.setCreateMode}>Add new record</button>
                }
            </div>
        );
    }
}

export default Table;