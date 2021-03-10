import React from 'react';

class Table extends React.Component {
    tableData = [
        {name: 'Ivan', city: 'Moscow'},
        {name: 'Mike', city: 'LA'},
        {name: 'Irina', city: 'Voronezh'}
    ];

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <th>
                            Name
                        </th>
                        <th>
                            City
                        </th>
                    </thead>
                    <tbody>
                    {this.tableData.map((item) =>
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;