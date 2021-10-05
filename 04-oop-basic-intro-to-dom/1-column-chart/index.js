export default class ColumnChart {
    constructor({...args} = {}) {
        const {data = [], label = '', link = '', value = 0, chartHeight = 50} = args;
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.chartHeight = chartHeight;
        this.element = this.render();
        this.columnChart = this.element
        this.renderChartContainer ();
    }
    
    render (){
        const formatHeadingValue =  this.formatHeading();
        const columnChart = document.createElement('div');
        columnChart.classList.add('column-chart');
        columnChart.style.cssText = `--chart-height: ${this.chartHeight}`;
        columnChart.innerHTML = `
            
                <div class="column-chart__title">
                    Total ${this.label}
                    <a href="${this.link}" class="column-chart__link">View all</a>
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">${formatHeadingValue}</div>
                    <div data-element="body" class="column-chart__chart"></div>
                </div>
        `;
        if (  this.data.length === 0 || this.data == undefined) {
            columnChart.classList.add('column-chart_loading');
        } 

        return columnChart;
    }
    
    renderChartContainer () {
        const percents = [];
        const values = [];
        
        this.getColumnProps(this.data)
        .map(item => Object.values(item).map(key => {
            key.includes('%') ? percents.push(key) : values.push(key)
        }));

        const elementBodyInner = this.data.map((elem, index) => `
                <div style="--value: ${values[index]}" data-tooltip=${percents[index]}></div>
        `).join('');
        const elementBody = this.element.querySelector('.column-chart__chart'); 
        elementBody.innerHTML = elementBodyInner;
    }

    getColumnProps(data) {
        const maxValue = Math.max(...data);
        const scale = 50 / maxValue;
        
        return this.data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
    }

    formatHeading (){
        const headingValue = `USD ${this.value}`;
        return headingValue;
    }

    update (data) {
        this.data = data;
        this.renderChartContainer ();
    }

    remove () {
        this.element.remove();
    }

    destroy () {
        this.remove();
    }
}
