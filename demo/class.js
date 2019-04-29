class Processor {
  constructor(props) {
    super(props, '123');
  }

  createG2Instance() {
    console.log(this)
  }
}

class PureChart {
  constructor() {
    this.name = 'Chart';
    this.g2Processor = new Processor();
  }
  getParentInfo () {
    this.g2Processor.createG2Instance()
  }
}
chart = new PureChart()
chart.getParentInfo()
