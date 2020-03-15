var headTemplate = `<input type="text" v-model="newElement" v-on:keyup="checkEnter" placeholder="ctrl + enter">
      <button v-on:click="addElement">Add</button>`;
      
Vue.component("addCountryBtn", {
  template: headTemplate,
  data() {
    return {
        heading: "Countries"
    }
  },
    methods: {
     addElement: function () {
     this.$root.$emit("New Country", this.newElement)
    },
    checkEnter: function (e) {
      if (e.keyCode === 13 && e.ctrlKey == true) {
        this.addElement();
      }
    }
    }
  })

var headTemplate = `<h1>{{ heading }}</h1>
`;
      
Vue.component("title-head", {
  template: headTemplate,
  data() {
    return {
        heading: "Countries"
    }
  }
  })
  
var searchTemplate = `<input type="text" v-model="countryName" v-on:change="sendData"  placeholder="Search country"/>`;  
  
Vue.component("search", {
  template: searchTemplate,
  data() {
    return {
      countryName: ""
    };
  },
  methods: {
    sendData() {
      this.$root.$emit("Country Entered", this.countryName);
    }
  }
});

var countryList = `
  <div>
  <br>
     <country v-for="country in filteredList" :key="country.id">
        <p v-bind:id="country.id">{{country.title}}</p>
     </country>
   </div>
  `;

Vue.component("countries", {
  template: countryList,
  data() {
    return {
      countryName: "",
      addCountryName: "",
      countries: [
        { id: 1, title: "India" },
        { id: 2, title: "China" },
        
      ]
    };
  },
  mounted() {
    this.$root.$on("Country Entered", countryName => {
      this.countryName = countryName;
    });
    this.$root.$on("New Country", countryName => {
      this.countries.push({id:'', title: this.newElement })
      this.newElement = "";
    });
    
  },
  computed: {
    filteredList() {
      return this.countries.filter(country => {
        return country.title
          .toLowerCase()
          .includes(this.countryName.toLowerCase());
      });
    }
  }
});

var countryRowTemp = `<div class='card'><slot></slot></div>`;

Vue.component("country", {
  template: countryRowTemp
});

new Vue({
  el: "#app",
  data: {
  }
});