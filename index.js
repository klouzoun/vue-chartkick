/*
 * Vue Chartkick
 * Create beautiful charts with one line in Vue.js
 * https://github.com/ankane/vue-chartkick
 * v0.1.1
 * @license MIT
 */

var Vue = require("vue")
var Chartkick = require("chartkick")
var chartId = 1

var createComponent = function(tagName, chartType) {
  Vue.component(tagName, {
    props: ["data", "id", "width", "height", "min", "max", "colors", "stacked", "discrete", "label", "xtitle", "ytitle", "library"],
    template: '<div v-bind:id="chartId" v-bind:style="chartStyle">Loading...</div>',
    data: function() {
      return {
        chartId: null
      }
    },
    computed: {
      chartStyle: function() {
        // hack to watch data and options
        this.data
        this.chartOptions

        return {
          height: this.height || "300px",
          lineHeight: this.height || "300px",
          width: this.width || "100%",
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
        }
      },
      chartOptions: function() {
        var options = {}
        var props = ["min", "max", "colors", "stacked", "discrete", "label", "xtitle", "ytitle", "library"]
        for (var i = 0; i < props.length; i++) {
          var prop = props[i]
          if (this[prop]) {
            options[prop] = this[prop]
          }
        }
        return options
      }
    },
    created: function() {
      this.chartId = this.chartId || this.id || ("chart-" + chartId++)
    },
    mounted: function() {
      this.renderChart()
    },
    updated: function() {
      this.renderChart()
    },
    methods: {
      renderChart: function() {
        new chartType(this.chartId, this.data, this.chartOptions)
      }
    }
  })
}

createComponent("line-chart", Chartkick.LineChart)
createComponent("pie-chart", Chartkick.PieChart)
createComponent("column-chart", Chartkick.ColumnChart)
createComponent("bar-chart", Chartkick.BarChart)
createComponent("area-chart", Chartkick.AreaChart)
createComponent("scatter-chart", Chartkick.ScatterChart)
createComponent("geo-chart", Chartkick.GeoChart)
createComponent("timeline", Chartkick.Timeline)