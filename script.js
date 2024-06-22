var form = document.getElementById("formId");
var dataTable = document.getElementById("dataTable");

var array = [];
//This is a function to read the Form Data and store it in an object and then in an array
function getFormData(event) {
    //preventing page from reloading on form submit
    event.preventDefault()
    //here 'data' is an object
    var data = new FormData();
    //inserting values,(key,value) to this object 'data'
    data.append("id", array.length + 1);
    data.append("book_name", document.getElementById("book-name").value);
    data.append("issued_to", document.getElementById("user-name").value);
    data.append("issued_time", getDateTime());
    data.append("status", Boolean(false));
    //collecting & storing values in an object and pushing it to array
    const formDataObj = {};
    data.forEach((value, key) => (formDataObj[key] = value));
    array.push(formDataObj)
    appendToTable(array)
    //clearing input fields
    document.getElementById("book-name").value = ""
    document.getElementById("user-name").value = ""
}
form.addEventListener('submit', getFormData);
//This is a function to display the data in the table
function appendToTable(arr) {
    clearFields()
    arr.map((e, index) => {
        //creating row inside table at the last
        var row = dataTable.insertRow(-1);
        //creating cells to insert data
        var id = row.insertCell(0)
        var bookName = row.insertCell(1)
        var issuedTo = row.insertCell(2)
        var issuedTime = row.insertCell(3)
        var status = row.insertCell(4)
        //inserting data in the cells
        id.innerHTML = e.id
        bookName.innerHTML = e.book_name
        issuedTo.innerHTML = e.issued_to
        issuedTime.innerHTML = e.issued_time
        status.innerHTML = `<span style="color: ${e.status == "false" ? "red" : "lime"}" > ${e.status == "false" ? "Not Returned" : "Returned"} </span>
        <button type="submit"> <img src="edit-icon.png" onclick="changeStatus(${index + 1})"> </button> `
        //giving a class to STATUS column to represent the text and img/btn in aligned way
        status.className = "statusField"
    })
}
//This is a function to change the status of the book returned or not
function changeStatus(id) {
    array = array.map((e) => {
            if(e.id == id){
                if(e.status == "false"){
                    e.status = "true"
                }
                else{
                    e.status = "false"
                }
            }
            return e
        })
    appendToTable(array)
}
//This is a function to clear the existing old data from the table
function clearFields() {
    var totalRows = dataTable.rows.length;
    for (var i = totalRows - 1; i > 0; i--) {
        dataTable.deleteRow(i);
    }
}
//This is a function to get the current Date & Time is a particular format
function getDateTime() {
    let currentDate = new Date().toJSON().slice(0, 10);
    const dd = currentDate.substring(8, 10)
    const mm = currentDate.substring(5, 7)
    const yyyy = currentDate.substring(0, 4)
    currentDate = dd + '/' + mm + '/' + yyyy;

    var d = new Date();
    var time = d.toLocaleTimeString();
    var index = time.lastIndexOf(":")
    var currentTime = time.substring(0, index - 1) + time.substring(index + 2, time.length)

    return `${currentDate} at ${currentTime}`
}