/*
This is a file for only communication interface with a server.
In real developing you should delete "virtual axios" parts in this file
and use real axios parts alternatively.
*/

// import axios from "controllers/axios"

let rows = [
    {
        id: 1,
        login: "cycle-depot",
        title: "Cycle-Depot",
        desc: "Fat",
        dateCreated: "2023-03-09"
    },
    {
        id: 2,
        login: "toplowriderstore",
        title: "Top Lowrider",
        desc: "Has",
        dateCreated: "2023-03-09"
    }
];

const getAll = () => {
    //real axios
    // return axios.get('/seller', {});

    //virtual axios
    return new Promise((resolve, reject) => {
        const res = { data: rows };
        resolve(res);
    });
};

const saveRow = (row) => {
    console.log(row); 

    //real axios
    // return axios.patch('/seller', row);

    //virtual axios
    return new Promise((resolve, reject) => {
        if(row.isNew) rows.push(row);
        else rows = rows.map(r => r.id === row.id ? row : r);
        resolve({ data: row });
    });
};

const deleteRow = (rowId) => {
    console.log(rowId); 
    //real axios
    // return axios.delete(`/seller/${rowId}`);

    //virtual axios
    return new Promise((resolve, reject) => {
        const deletedRow = rows.find((r) => r.id === rowId);
        rows = rows.filter(r => r.id !== rowId);
        resolve({ data: deletedRow });
    });
};

const SellerController = {
    getAll,
    saveRow,
    deleteRow
};

export default SellerController;
