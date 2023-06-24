<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import * as yup from 'yup';

const imageSource = ref("https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1-300x300.jpg");

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


async function submitForm() {

  try {

    await rulesValidations.validate(JSON.parse(JSON.stringify(formData)), { abortEarly: false });

    let options = {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(formData)
    };
    let url = 'http://localhost:3000/users';

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));

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

  // let url = 'http://localhost:3000/users';

  // let options = { method: 'GET' };

  // fetch(url, options)
  //   .then(res => res.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.error('error:' + err));

});

</script>

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

