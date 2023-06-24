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

<template>
  <main>

    <div id="register">

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
                <input v-model="formData.lastname" @input="validationErrors.lastname = ''" type="text"
                  class="form-control" placeholder="Doe">

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
                <button class="btn btn-dark" type="submit">Submit</button>
                <small :hidden="isFormComplete" class="text-danger">Fill the form to enable the button!</small>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="floating-div d-flex justify-content-center rounded rounded-5 gap-2">
      <a href="#register" class="btn btn-primary rounded rounded-5">Registro</a>
      <a href="#table" class="btn btn-secondary rounded rounded-5">Tabla</a>
    </div>

    <div  class="min-vh-100">
      <div class="container mt-5 py-5">
        <div class="card p-5 col-md-8 mx-auto ">
          <div class="table-container">
            <table id="table" class="table table-hover  table-responsive ">
              <thead class="sticky-top">
                <tr class="">
                  <th scope="col">#</th>
                  <th scope="col">Img</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(person, i) in persons" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>
                    <img class=" border border-4 rounded rounded-circle"
                      style="height: 50px; width: 50px; object-fit: cover;" :src="person.profileImage" alt="" srcset="">
                  </td>
                  <td>{{ person.name }}</td>
                  <td>{{ person.lastname }}</td>
                  <td>{{ person.email }}</td>
                  <td>{{ person.phone }}</td>
                  <td><button class="btn btn-danger rounded rounded-5"><i class="fa-solid fa-trash-can"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

