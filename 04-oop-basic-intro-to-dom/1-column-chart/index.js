export default class ColumnChart {
    element;
    constructor({...args} = {}) {
        const {data = [], label = '', link = '', value = 0, chartHeight = 50} = args;
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.chartHeight = chartHeight;
        this.render();
        this.renderChartContainer ();
    }
    
    render (){
        const formatHeadingValue =  this.formatHeading();
        const columnChart = document.createElement('div');
        columnChart.innerHTML = `
            <div class="column-chart" style="--chart-height: 50">
                <div class="column-chart__title">
                    Total ${this.label}
                    <a href="${this.link}" class="column-chart__link">View all</a>
                </div>
                <div class="column-chart__container">
                    <div data-element="header" class="column-chart__header">${formatHeadingValue}</div>
                    <div data-element="body" class="column-chart__chart"></div>
                </div>
            </div>    
        `;
        this.element = columnChart.firstElementChild;
        if (  this.data.length === 0 || this.data === undefined) {
            this.element.classList.add('column-chart_loading');
        } 
    }
    
    renderChartContainer () {
        const percents = [];
        const values = [];
        
        this.getColumnProps(this.data)
        .forEach(item => Object.values(item).map(key => {
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
        const scale = this.chartHeight / maxValue;
        
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
