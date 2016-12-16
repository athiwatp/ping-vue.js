<template>
  <div id="app">
    <div> <input-view :ping-url="pingUrl"></input-view> </div><br>
    <inter :time="time" :host="host" :output="output" :alive="alive" :my-ip="myIp"></inter>
    <div><canvas id="chart" style="width:480px; height: 300px; background-color: #111019;"></canvas></div>
    <div class="side"><history :history-ping="historyPing"></history></div>
  </div>
</template>

<script>
import inter from './components/interface'
import inputView from './components/input'
import history from './components/history'
/* global Chart, swal */
Chart.defaults.global.animationEasing = 'easeInOutQuad'
Chart.defaults.global.responsive = true
Chart.defaults.global.scaleOverride = true
Chart.defaults.global.scaleShowLabels = false
Chart.defaults.global.scaleSteps = 50
Chart.defaults.global.scaleStepWidth = 10
Chart.defaults.global.scaleStartValue = 0
Chart.defaults.global.tooltipFontFamily = 'Open Sans'
Chart.defaults.global.tooltipFillColor = '#FFFFFF'
Chart.defaults.global.tooltipFontColor = '#6E6E6E'
Chart.defaults.global.tooltipCaretSize = 0
Chart.defaults.global.maintainAspectRatio = true
Chart.defaults.Line.scaleShowHorizontalLines = false
Chart.defaults.Line.scaleShowHorizontalLines = false
Chart.defaults.Line.scaleGridLineColor = '#55505C'
Chart.defaults.Line.scaleLineColor = '#55505C'
export default {
  name: 'app',
  components: {
    inter,
    inputView,
    history
  },
  mounted () {
    let vm = this
    vm.publicIpAddress()
    setTimeout(() => {
      vm.publicIpAddress()
    }, 7000)
  },
  data () {
    return {
      time: 0,
      output: '',
      host: '',
      alive: false,
      historyPing: [],
      pointGraph: [],
      myIp: ''
    }
  },
  methods: {
    pingUrl (text) {
      console.log(text)
      if (!text.trim()) {
        swal('Not insert link', 'Please insert Domain again ?', 'question')
      } else if (text) {
        let url = { url: text }
        this.$http.post('http://localhost:4000/ping', url).then((res) => {
          console.log(res.body)
        })
        let vm = this
        setTimeout(() => {
          vm.getUrl()
        }, 3000)
        setTimeout(() => {
          vm.graph()
        }, 4000)
      }
    },
    getUrl () {
      this.$http.get('http://localhost:4000/api/ping').then((res) => {
        this.pointGraph = []
        let index = res.data.length - 1
        this.host = res.data[index].host
        this.time = res.data[index].time
        this.alive = res.data[index].alive
        this.output = res.data[index].output
        let point = [
          {
            time: this.time - 12.3
          },
          {
            time: this.time - 23.4
          },
          {
            time: this.time
          },
          {
            time: this.time - 5
          },
          {
            time: this.time
          }
        ]
        this.pointGraph.push(point)
        this.historyPing = res.data
        if (this.alive === false) {
          swal('Url Error 404', 'Please insert Domain again ?', 'error')
          this.pointGraph[0] = []
        }
      })
      console.log(this.pointGraph[0].map(item => item.time))
    },
    graph () {
      var chart = document.getElementById('chart').getContext('2d')
      var gradient = chart.createLinearGradient(0, 0, 0, 450)
      var data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Custom Label Name',
            fillColor: gradient,
            strokeColor: '#FC2525',
            pointColor: 'white',
            pointStrokeColor: 'rgba(220,220,220,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: this.pointGraph[0].map(item => item.time)
          }
        ]
      }
      gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')
      chart = new Chart(chart).Line(data)
    },
    publicIpAddress () {
      let vm = this
      this.$http.get('http://localhost:4000/api/publicip').then((res) => {
        console.log('now public ip :::: ', res.data)
        vm.myIp = res.data
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #171820;
  margin-top: 60px;
}
.side {
  position: absolute;
    z-index: 2;
    margin-left: 34%;
    margin-top: -57%;
}
</style>
