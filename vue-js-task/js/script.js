var searchTemplate = `<table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries | filterBy filterKey">
          <td v-for="key in columns">{{{country[key] | filterKey | capitalize}}}</td>
        </tr>
      </tbody>
    </table>`;

Vue.component('table-component', {
  template: searchTemplate,
  props: {
    countries: Array,
    columns: Array,
    filterKey: String
  }
})
var pgHeader = `<h1 align="center">{{ title }}</h1>`

Vue.component('country-head', {
  props: ['title'],
  template: pgHeader
});


var demo = new Vue({
  el: '#container',
  data: {
    title: 'Countries',
    elements: [],
    newElement: '',
    searchQuery: '',
    gridColumns: ['countryName'],
    gridData: [
      { countryName: 'India' }
    ]
  },
  methods: {
    addElement: function () {
      var t = this.gridData.push({ countryName: this.newElement })
      this.newElement = "";
    },
    checkEnter: function (e) {
      if (e.keyCode === 13 && e.ctrlKey == true) {
        this.addElement();
      }
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})