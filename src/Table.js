import React from 'react';

class Table extends React.Component {
    tableData = [
        {name: 'Ivan', city: 'Moscow'},
        {name: 'Mike', city: 'LA'},
        {name: 'Irina', city: 'Voronezh'}
    ];

    constructor(props) {
        super(props)
        this.state = {
            rows: this.tableData
        };
        this.addNewRecord = this.addNewRecord.bind(this);
    }

    addNewRecord() {
        let currentRecord = this.state;
        currentRecord.rows.push({name: 'Bruce', city: 'New-York'});
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
                                City
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.rows.map((item) =>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
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