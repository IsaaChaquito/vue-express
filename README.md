# VUE-EXPRESS
## SQL - CREAR BASE DE DATOS
```sql
create database vue_express
use vue_express
go;
CREATE TABLE Person (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    profileImage VARCHAR(max) NOT NULL
);

go;
CREATE PROCEDURE sp_user_insert
    @name VARCHAR(50),
    @lastname VARCHAR(50),
    @email VARCHAR(100),
    @phone VARCHAR(15),
    @profileImage VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Person (name, lastname, email, phone, profileImage)
    VALUES (@name, @lastname, @email, @phone, @profileImage);
END;

go
create procedure sp_user_get_by_id
@id VARCHAR(50)
as
begin
select [name],lastname,email,phone,profileImage from Person where id = @id
end

go;
create procedure sp_user_getAll
@id VARCHAR(50)
as
begin
select [name],lastname,email,phone,profileImage from Person
end
```

# VUE

- Instalar
> npm init vue@latest
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

> cd <your-project-name>
> npm install axios
> npm install yup
> npm install bootstrap-toaster
> npm install bootstrap
> npm install
> npm run dev

> Esto mostrara un template por defecto de vue

> Desplazarse hasta index.html y agregar  entre los head

```
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
      crossorigin="anonymous"
    ></script>
    <script src="https://kit.fontawesome.com/0f02ee1723.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
```

> Desplazarse a assets > main.css y agregar

```
.up-file {
  cursor: pointer;
  top: 100px;
  right: 0;
  background-color: #212060 !important;
}

.up-file:hover{
  background-color: rgb(0, 0, 0) !important;
}

body{
  background: linear-gradient(55deg, #0C0B19 0%, #2A297B 100%);
}

.floating-div {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  bottom: 20px;
  z-index: 10000;
  border: solid 2px #201f5a;
}

.table-container{
  height:800px;
  overflow-y:scroll;
}
```

> Desplazarse a la direccion /src/views/HomeViewer

> Eliminar todo el contenido y remplazarlo con 

```
<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import * as yup from 'yup';
import axios from "axios";
import toast from "../Utils/Toast"

const imageSource = ref("https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1-300x300.jpg");
const persons = ref([]);

const formData = reactive({
  name: '',
  lastname: '',
  email: '',
  phone: '',
  profileImage: imageSource
});

const validationErrors = reactive({
  name: '',
  lastname: '',
  email: '',
  phone: '',
});

const rulesValidations = yup.object().shape({
  name: yup.string().required().matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
  lastname: yup.string().required().matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
  email: yup.string().required().email(),
  phone: yup.string().required().matches(/^[0-9]+$/, 'Only numbers are allowed').min(8),
});

function clearInputs() {
  formData.name = '';
  formData.lastname = '';
  formData.email = '';
  formData.phone = '';
  formData.profileImage = "https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1-300x300.jpg";

  validationErrors.name = '';
  validationErrors.lastname = '';
  validationErrors.email = '';
  validationErrors.phone = '';
}

async function submitForm() {
  console.log(JSON.parse(JSON.stringify(formData)));
  try {
    await rulesValidations.validate(JSON.parse(JSON.stringify(formData)), { abortEarly: false });
    const options = { method: 'POST', url: 'http://localhost:3000/users', data: formData };
    axios.request(options).then(function (response) {
      console.log(response.data);
      getAllRecords();
      clearInputs();
      toast('YEI!!!', 'person create success', 'success', 5000).fire();
    }).catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((validationError) => {
        validationErrors[validationError.path] = validationError.message;
      });
    }
  }
}

function handleFileInputChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageSource.value = reader.result;
    };
  }
}

const isFormComplete = computed(() => {
  return (
    formData.name !== '' &&
    formData.lastname !== '' &&
    formData.email !== '' &&
    formData.phone !== ''
  );
});

onMounted(() => {
  getAllRecords();
});

const getAllRecords = () => {

  const options = { method: 'GET', url: 'http://localhost:3000/users' };

  axios.request(options).then(function (response) {
    console.log(response.data);
    persons.value = response.data;
  }).catch(function (error) {
    console.error(error);
  });
}

</script>
```

```vue
<template>
  <main>
    <div class="container min-vh-100">
      <div class="row col-sm-12 col-md-12 col-lg-6 col-xxl-6 mx-auto">
        <div class="card boder border-0 mt-5">

          <div class="position-relative  mx-auto mt-5 border border-4 rounded rounded-circle">
            <img class=" border border-4 rounded rounded-circle" style="height: 150px; width: 150px; object-fit: cover;"
              :src="imageSource" alt="" srcset="">

            <label style="height: 40px; width: 40px;" for="file-input"
              class="position-absolute up-file btn btn-dark text-light rounded rounded-circle">
              <i class="bi bi-upload"></i>
            </label>
          </div>

          <input hidden type="file" id="file-input" @change="handleFileInputChange">


          <form @submit.prevent="submitForm" class="p-5">
            <div class="mb-3">
              <label class="form-label" for="">Name</label>
              <input v-model="formData.name" @input="validationErrors.name = ''" type="text" class="form-control"
                placeholder="John">

              <div class="input-errors">
                <small class="text-danger">{{ validationErrors.name }}</small>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="">Last Name</label>
              <input v-model="formData.lastname" @input="validationErrors.lastname = ''" type="text" class="form-control"
                placeholder="Doe">

              <div class="input-errors">
                <small class="text-danger">{{ validationErrors.lastname }}</small>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="">Email</label>
              <input v-model="formData.email" @input="validationErrors.email = ''" type="text" class="form-control"
                placeholder="JohnDoe@domain.com">
              <div class="input-errors">
                <small class=" text-danger">{{ validationErrors.email }}</small>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="">Phone Number</label>
              <input v-model="formData.phone" @input="validationErrors.phone = ''" type="text" class="form-control"
                placeholder="00000000">

              <div class="input-errors">
                <small class="text-danger">{{ validationErrors.phone }}</small>
              </div>
            </div>

            <div class="mt-4 d-flex flex-column">
              <button :disabled="!isFormComplete" class="btn btn-dark" type="submit">Submit</button>
              <small :hidden="isFormComplete" class="text-danger">Fill the form to enable the button!</small>
            </div>

          </form>
        </div>
      </div>
    </div>
  </main>
</template>
```
> Crear una carpeta por ejemplo Utils y crear un archivo llamado Toast.js

```
import { TOAST_PLACEMENT, TOAST_STATUS, Toast } from 'bootstrap-toaster';

function toast(title, message = 'success', status = 'success', timeout = 3000, setPlacement = 'top-right') {
  if (status === 'success') {
    status = TOAST_STATUS.SUCCESS;
  } else if (status === 'danger') {
    status = TOAST_STATUS.DANGER;
  } else if (status === 'warning') {
    status = TOAST_STATUS.WARNING;
  } else {
    status = TOAST_STATUS.INFO;
  }

  if (setPlacement === 'top-right') {
    Toast.setPlacement(TOAST_PLACEMENT.TOP_RIGHT);
  } else {
    Toast.setPlacement(TOAST_PLACEMENT.BOTTOM_RIGHT);
  }

  let toast = {
    title: title,
    message: message,
    status: status,
    timeout: timeout,
  };

  const fire = () => {
    Toast.create(toast);
  };

  return { fire };
}

export default toast;
```