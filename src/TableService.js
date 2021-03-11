import axios from 'axios'

class TableService {

    getRecords() {
        return axios.get('http://178.128.196.163:3000/api/records');
    };

    addRecord(record) {
        return axios.put('http://178.128.196.163:3000/api/records/', record);
    };

    deleteRecord(id) {
        return axios.delete('http://178.128.196.163:3000/api/records/' + id);
    };

    updateRecord(id, record) {

    };
}

export default new TableService()