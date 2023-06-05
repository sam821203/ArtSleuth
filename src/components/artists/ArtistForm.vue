<template>
  <form class="layout--main m-top--md" @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !coverPhoto.isValid }">
      <div class="cover-photo">
        <div class="img-wrap">
          <img src="./default-cover-photo.png" alt="" />
        </div>
        <label for="coverPhoto">Upload photo</label>
        <input
          id="coverPhoto"
          ref="coverPhoto"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          @change="handleCoverPhotoChange"
          @blur="clearValidity(coverPhoto)"
        />
      </div>
    </div>
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName"> First name </label>
      <input
        id="firstName"
        v-model.trim="firstName.val"
        type="text"
        @blur="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">First name must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName"> Last name </label>
      <input
        id="lastName"
        v-model.trim="lastName.val"
        type="text"
        @blur="clearValidity(lastName)"
      />
      <p v-if="!lastName.isValid">Last name must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !country.isValid }">
      <label for="country">Select country</label>
      <select
        id="country"
        v-model.trim="country.val"
        @blur="clearValidity(country)"
      >
        <option
          v-for="(countryName, index) in countries"
          :key="countryName"
          :selected="index === 0"
        >
          {{ countryName }}
        </option>
      </select>
    </div>
    <div class="form-control" :class="{ invalid: !birthday.isValid }">
      <label for="birthday"> Birthday </label>
      <input
        id="birthday"
        v-model.trim="birthday.val"
        type="date"
        name="birthday"
        @change="handleBirthdayOutput"
        @blur="clearValidity(birthday)"
      />
      <p v-if="!description.isValid">Description must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description"> Description </label>
      <textarea
        id="description"
        v-model.trim="description.val"
        rows="5"
        @blur="clearValidity(description)"
      />
      <p v-if="!description.isValid">Description must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate"> Hourly Rate </label>
      <input
        id="rate"
        v-model.number="rate.val"
        type="number"
        @blur="clearValidity(rate)"
      />
      <p v-if="!rate.isValid">Rate must not be empty!</p>
    </div>
    <div
      class="form-control filter__options"
      :class="{ invalid: !areas.isValid }"
    >
      <h3>Areas of Expertise</h3>
      <div class="filter__option">
        <label for="limitedEdition">
          limited-edition
          <input
            id="limitedEdition"
            v-model="areas.val"
            type="checkbox"
            value="limitedEdition"
            @blur="clearValidity(areas)"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="unique">
          Unique
          <input
            id="unique"
            v-model="areas.val"
            type="checkbox"
            value="unique"
            @blur="clearValidity(areas)"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="painting">
          Painting
          <input
            id="painting"
            v-model="areas.val"
            type="checkbox"
            value="painting"
            @blur="clearValidity(areas)"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="sculpture">
          Sculpture
          <input
            id="sculpture"
            v-model="areas.val"
            type="checkbox"
            value="sculpture"
            @blur="clearValidity(areas)"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="filter__option">
        <label for="prints">
          Prints
          <input
            id="prints"
            v-model="areas.val"
            type="checkbox"
            value="prints"
            @blur="clearValidity(areas)"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected!</p>
    </div>
    <p v-if="!formIsValid">Please fix above errors!</p>
    <base-button mode="cta-btn" class="m-bottom--xl">Submit form</base-button>
  </form>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

// import {
//   ref as storageReference,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import storage from "../../firebase";

export default {
  emits: ["save-data"],
  setup(_, context) {
    const coverPhoto = reactive({
      val: "",
      isValid: true,
    });
    const firstName = reactive({
      val: "",
      isValid: true,
    });
    const lastName = reactive({
      val: "",
      isValid: true,
    });
    const country = reactive({
      val: "",
      isValid: true,
    });
    const birthday = reactive({
      val: "",
      isValid: true,
    });
    const description = reactive({
      val: "",
      isValid: true,
    });
    const rate = reactive({
      val: null,
      isValid: true,
    });
    const areas = reactive({
      val: [],
      isValid: true,
    });

    const countries = ref([]);
    const formIsValid = ref(true);

    const handleCoverPhotoChange = (event) => {
      const photo = document.querySelector(".cover-photo img");
      const imageFile = event.target.files[0];

      if (imageFile) {
        const reader = new FileReader();

        reader.readAsDataURL(imageFile);

        // FileReader will emit the load event when the data URL is ready
        reader.addEventListener("load", () => {
          photo.src = reader.result;
          coverPhoto.val = reader.result;
        });
      }
    };

    // inputField 填放上面參數的 proxy 物件
    const clearValidity = (inputField) => {
      inputField.isValid = true;
    };

    const validateForm = () => {
      // 一開始先設成 true，以防止再上一個 submit 的狀態
      formIsValid.value = true;

      if (coverPhoto.val === "") {
        coverPhoto.isValid = false;
        formIsValid.value = false;
      }

      if (firstName.val === "") {
        firstName.isValid = false;
        formIsValid.value = false;
      }

      if (lastName.val === "") {
        lastName.isValid = false;
        formIsValid.value = false;
      }

      if (country.val === "") {
        country.isValid = false;
        formIsValid.value = false;
      }

      if (birthday.val === "") {
        birthday.isValid = false;
        formIsValid.value = false;
      }

      if (description.val === "") {
        description.isValid = false;
        formIsValid.value = false;
      }

      if (!rate.val || rate.val < 0) {
        rate.isValid = false;
        formIsValid.value = false;
      }

      if (areas.val.length === 0) {
        areas.isValid = false;
        formIsValid.value = false;
      }
    };

    const submitForm = () => {
      validateForm();

      // 如果 form 沒有被 validate，就 return 回去，以停止之後的動作
      if (!formIsValid.value) {
        return;
      }
      const formData = {
        photo: coverPhoto.val,
        first: firstName.val,
        last: lastName.val,
        country: country.val,
        birthday: birthday.val,
        desc: description.val,
        rate: rate.val,
        areas: areas.val,
      };

      context.emit("save-data", formData);
    };

    const renderCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");

      const data = await res.json();

      data.forEach((el) => {
        const countryName = el.name.common;

        countries.value.push(countryName);
        countries.value.sort();
      });
    };

    onMounted(() => {
      renderCountries();
    });

    return {
      coverPhoto,
      firstName,
      lastName,
      country,
      birthday,
      description,
      rate,
      areas,
      formIsValid,
      clearValidity,
      validateForm,
      submitForm,
      renderCountries,
      countries,
      handleCoverPhotoChange,
    };
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.cover-photo > label {
  display: block;
  padding: 12px 0;
  margin: 10px auto;
  width: 120px;
  font-size: 0.75rem;
  text-align: center;
  color: #fff;
  background: #000;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
}

.filter__option label {
  font-weight: 400;
  margin-bottom: 1%;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  margin-bottom: 2%;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #a9a9a9 solid 1px;
}

input[type="file"] {
  display: none;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.circle-card {
  padding: 40px;
  width: 400px;
  text-align: center;
  color: #333;
  background-color: #fff;
  border-radius: 15px;
}

.cover-photo .img-wrap {
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: auto;
  width: 180px;
  height: 180px;
}

.cover-photo img {
  margin-top: 40px;
  margin-bottom: 30px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.form-control.filter__options {
  margin-bottom: 4%;
}

button {
  border: none;
}
</style>
