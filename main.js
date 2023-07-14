const todoWrapper = document.getElementById('todoWrapper');
const modal = document.getElementById('modal');

// Mengambil Elemen dari input
const inputTodo = document.getElementById('inputTodo');

// Mendapatkan elemen input baru
const inputEdit = document.getElementById('inputEdit');

let idParams = [''];

// Membuat function addTodo
function addTodo() {

    // Mengubah semua kata menjadi huruf kecil
    const inputTodoValue = lowerCaseWord(inputTodo.value)

    // Lakukan pengecekan
    let available = checker(inputTodoValue); 

    // Jika input kosoong / ada yg sama 
    if(!inputTodoValue || available == true ) {
        console.log('Tidak boleh kosong')
        // Membersihkan Field input
        inputTodo.value = '';
        return
    }

    // Membuat id sebagai parameter
    const id = Math.floor(Math.random() * 10000) + 1;
    console.log(id)

    // Memasukan input value ke list Todo
    const todo = `<li class="flex gap-2 py-4 bg-slate-300 rounded-md shadow-md ">
    <h1 class="text-medium w-1/2 text-center ${id}">${inputTodoValue}</h1>
    <button class="border border-sky-400 bg-sky-500 rounded-md px-2 hover:ring-1 hover:ring-sky-300 active:ring-1 active:shadow-md active:shadow-sky-300 active:bg-sky-400 shadow text-slate-200 text-medium transition duration-200" onclick="edit(this)" data-id="${id}">Edit</button>
    <button class="border border-red-400 bg-red-500 rounded-md px-2 hover:ring-1 hover:ring-red-300 active:ring-1 active:shadow-md active:shadow-red-300 active:bg-red-400 shadow text-slate-200 text-medium transition duration-200" onclick="del(this)">Delete</button>
    <button class="border border-green-400 bg-green-500 rounded-md px-2 hover:ring-1 hover:ring-green-300 active:ring-1 active:shadow-md active:shadow-green-300 active:bg-green-400 shadow text-slate-200 text-medium transition duration-200 " onclick="done(this)">Done</button>`

    // Merangkai Todo
    todoWrapper.insertAdjacentHTML('afterbegin', todo )

    // Membersihkan Field input
    inputTodo.value = '';
}

// Membuat Function edit
function edit(params) {
    
    // Memunculkan Modal
    modal.classList.toggle('hidden');

    idParams.splice(0,1, params.dataset.id) 
    
}

// Membuat function save setelah edit
function save() {
    // Parameter
    const id = idParams[0]

    // Mengubah semua kata menjadi huruf kecil
    const inputEditValue = lowerCaseWord(inputEdit.value)

     // Mengambil value yang mempunyai id dataset yang sama antara btn dan h1
    const currentTodoElem = document.getElementsByClassName(`${id}`); 
    
    // Lakukan pengecekan
    let available = checker(inputEditValue); 

    // Jika input baru kosong / ada yang sama
    if(!inputEdit.value || available == true) {
        // Tutup Modal
        modal.classList.toggle('hidden');
        // Membersihkan Field Input
        inputEdit.value = ''
    } else {

        // Tutup Modal
        modal.classList.toggle('hidden');

        // Mengembalikan Value Baru
        currentTodoElem[0].innerHTML = inputEditValue

        // Membersihkan Field Input
        inputEdit.value = ''
    } 
}

// Function delete
function del(params) {
    params.parentElement.remove()

}

// Function done
function done(params) {
    params.parentElement.classList.toggle('bg-slate-300')
    params.parentElement.classList.toggle('bg-green-300')
}

// Enter pada add todo
inputTodo.addEventListener("keypress", function(event) { 
    
    // jika user menekan enter
    if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Menjalankan function add
        addTodo()
    }
});

// Enter pada save
inputEdit.addEventListener("keypress", function(event) { 
    
    // jika user menekan enter
    if (event.key === "Enter") {
      // Cancel the default action, if needed
        event.preventDefault();
      // Menjalankan function save
        save()
    }
});

// Function Pengecekan
function checker(input) {

    let available = false

      // pengecekan Bila ada yang sama
      const allTodo = document.querySelectorAll('ul li h1');
      allTodo.forEach( todoText => {
          if(todoText.innerText == input) {
              console.log('Todo Is Ready')
              available = true
          }
      })

      return available 
}

// program to convert first letter of a string to lowercase
function lowerCaseWord(str) {

    // converting first letter to lowercase
    const lowercase = str.toLowerCase()

    return lowercase;
}