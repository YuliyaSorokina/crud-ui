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
            tempEmail: undefined,
            editId: undefined
        };

        this.saveRecord = this.saveRecord.bind(this);
        this.updateRecord = this.updateRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.setCreateMode = this.setCreateMode.bind(this);
        this.setEditMode = this.setEditMode.bind(this);
        this.clearTempData = this.clearTempData.bind(this);
    }

    componentDidMount() {
        TableService.getRecords()
            .then(res => this.setState({rows: res.data}));
    }

    saveRecord() {
        if (!this.state.tempName || !this.state.tempAge || !this.state.tempEmail) {
            alert("All fields are required");
            return
        }
        let currentRecord = {
            data: {name: this.state.tempName, age: this.state.tempAge, email: this.state.tempEmail}
        };
        TableService.addRecord(currentRecord)
            .then(res => {
                    let currentState = this.state;
                    currentState.rows.push(res.data);
                    this.clearTempData();
                    this.setState(currentState);
                }
            )
            .catch(reason => {
                console.error(reason)
            })
    }

    updateRecord() {
        let currentRecord = {
            data: {name: this.state.tempName, age: this.state.tempAge, email: this.state.tempEmail}
        };
        TableService.updateRecord(this.state.editId, currentRecord)
            .then(res => {
                let currentState = this.state;
                let updatedRecordIdx = currentState.rows.findIndex(row => row._id === this.state.editId);
                if (updatedRecordIdx !== -1) {
                    currentState.rows[updatedRecordIdx].data = currentRecord.data;
                    this.clearTempData();
                    this.setState(currentState);
                }
            })
            .catch(reason => {
                console.error(reason)
            })
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

    onNameInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    setCreateMode() {
        this.setState({mode: 'create'});
    }

    setEditMode(record) {
        let currentState = this.state;
        currentState.mode = 'edit';
        currentState.editId = record._id;
        currentState.tempName = record.data.name;
        currentState.tempAge = record.data.age;
        currentState.tempEmail = record.data.email;
        this.setState(currentState);
    }

    clearTempData() {
        let currentState = this.state;
        currentState.mode = 'view';
        currentState.tempName = undefined;
        currentState.tempAge = undefined;
        currentState.tempEmail = undefined;
        currentState.editId = undefined;
        this.setState(currentState);
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows.map((item) =>
                        this.state.mode === 'edit' && this.state.editId === item._id
                            ? <tr key={item._id}>
                                <td><input type="text" name="tempName" className="form-control" placeholder={item.data.name}
                                           defaultValue={item.data.name} autoFocus
                                           onChange={(e) => this.onNameInputChange(e)}/>
                                </td>
                                <td><input type="text" name="tempAge" className="form-control" placeholder={item.data.age}
                                           defaultValue={item.data.age} onChange={(e) => this.onNameInputChange(e)}/>
                                </td>
                                <td><input type="email" name="tempEmail" className="form-control"
                                           placeholder={item.data.email}
                                           defaultValue={item.data.email} onChange={(e) => this.onNameInputChange(e)}/>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success"
                                            onClick={() => this.updateRecord()}>Update
                                    </button>
                                    <button type="button" className="btn btn-secondary ml-1"
                                            onClick={() => this.clearTempData()}>Cancel
                                    </button>
                                </td>
                            </tr>
                            : <tr key={item._id}>
                                <td>{item.data.name}</td>
                                <td>{item.data.age}</td>
                                <td>{item.data.email}</td>
                                {this.state.mode === 'view'
                                    ? <td>
                                        <button type="button" className="btn btn-primary mr-1"
                                                onClick={() => this.setEditMode(item)}>Edit
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => this.deleteRecord(item._id)}>Delete
                                        </button>
                                    </td>
                                    : <td></td>
                                }
                            </tr>
                    )}
                    {this.state.mode === 'create' &&
                    <tr>
                        <td><input type="text" name="tempName" className="form-control" autoFocus placeholder="name"
                                   onChange={(e) => this.onNameInputChange(e)}/></td>
                        <td><input type="text" name="tempAge" className="form-control" placeholder="age"
                                   onChange={(e) => this.onNameInputChange(e)}/></td>
                        <td><input type="text" name="tempEmail" className="form-control" placeholder="email"
                                   onChange={(e) => this.onNameInputChange(e)}/></td>
                        <td>
                            <button type="button" className="btn btn-success" onClick={() => this.saveRecord()}>Save
                            </button>
                            <button type="button" className="btn btn-secondary ml-1"
                                    onClick={() => this.clearTempData()}>Cancel
                            </button>
                        </td>
                    </tr>
                    }
                    </tbody>
                </table>
                {this.state.mode === 'view' &&
                <button type="button" className="btn btn-outline-dark" onClick={this.setCreateMode}>Add new
                    record</button>
                }
            </div>
        );
    }
}

export default Table;