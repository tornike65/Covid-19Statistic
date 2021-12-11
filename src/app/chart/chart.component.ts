import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as echarts from 'echarts';
import { Timeline } from 'src/app/models/Timeline.model';
import {
  selectRouteParams,
} from '..//store/selectors/router.selector';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() chartData: Timeline[] = [];
  @ViewChild('barChart') barChart?: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngAfterViewInit(): void {
    this.setStyleToChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkRoute(changes.chartData.currentValue);
  }

  ngOnInit(): void {
    this.checkRoute(this.chartData);
  }

  // line chart - ის ინიციალიზება
  genereteLineChart(
    chartdata: Timeline[],
    mmonth?: boolean,
    FullTime?: boolean
  ) {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);

    var option;
    option = {
      color: ['#5470c6', '#91cc75', '#ee6666', '#eee6521'],

      tooltip: {
        trigger: 'axis',
      },

      legend: {
        data: ['Confirm', 'Recovery', 'Death', 'ThreMonth', 'FullTime'],
        itemWidth: 10,
        selected: {
          ThreMonth: mmonth,
          FullTime: FullTime == null ? true : FullTime,
        },
      },

      xAxis: {
        type: 'category',
        data: chartdata.map((x) => x.date).reverse(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirm',
          type: 'line',
          data: chartdata.map((x) => x.confirmed).reverse(),
          triggerEvent: true,
        },
        {
          name: 'Recovery',
          type: 'line',
          data: chartdata.map((x) => x.recovered).reverse(),
        },
        {
          name: 'Death',
          type: 'line',
          data: chartdata.map((x) => x.deaths).reverse(),
        },
        {
          name: 'ThreMonth',
          type: 'line',
          data: '',
        },
        {
          name: 'FullTime',
          type: 'line',
          data: '',
        },
      ],
    };
    var self = this;
    myChart.on('legendselectchanged', function (params: any) {
      self.filterData(params, myChart, chartDom, chartdata);
    });

    window.addEventListener('resize', function () {
      myChart.resize();
    });
    option && myChart.setOption(option);
  }
  // bar chart - ის ინიციალიზება
  genereteBarChart(
    chartdata: Timeline[],
    mmonth?: boolean,
    FullTime?: boolean
  ) {
    var chartDom = document.getElementById('main2')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      color: ['#5470c6', '#91cc75', '#ee6666'],

      tooltip: {
        trigger: 'axis',
      },

      legend: {
        data: ['Confirm', 'Recovery', 'Death', 'ThreMonth', 'FullTime'],
        itemWidth: 10,
        selected: {
          ThreMonth: mmonth,
          FullTime: FullTime == null ? true : FullTime,
        },
      },

      xAxis: {
        type: 'category',
        data: chartdata.map((x) => x.date).reverse(),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirm',
          type: 'bar',
          data: chartdata.map((x) => x.new_confirmed).reverse(),
        },
        {
          name: 'Recovery',
          type: 'bar',
          data: chartdata.map((x) => x.new_recovered).reverse(),
        },
        {
          name: 'Death',
          type: 'bar',
          data: chartdata.map((x) => x.new_deaths).reverse(),
        },
        {
          name: 'ThreMonth',
          type: 'bar',
          data: '',
        },
        {
          name: 'FullTime',
          type: 'bar',
          data: '',
        },
      ],
    };
    var self = this;
    myChart.on('legendselectchanged', function (params: any) {
      self.filterData(params, myChart, chartDom, chartdata);
    });

    window.addEventListener('resize', function () {
      myChart.resize();
    });
    option && myChart.setOption(option);
  }

  // მიმდინარე როურის შემოწმება და chart-ის გენერაცია
  checkRoute(data: Timeline[]) {
    this.store.pipe(select(selectRouteParams)).subscribe((params: Params) => {
      if (params.date) {
        this.genereteLineChart(data);
      } else {
        this.genereteLineChart(data);
        this.genereteBarChart(data);
      }
    });
  }

  // chart-ისთვის სტილის მინიჭება
  setStyleToChart() {
    this.store.pipe(select(selectRouteParams)).subscribe((params: Params) => {
      if (params.date) {
        this.renderer.setStyle(this.barChart?.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(
          this.barChart?.nativeElement,
          'display',
          'block'
        );
      }
    });
  }

  // chart - ის მონაცემების ფილტრაცია

  filterData(
    params: any,
    myChart: echarts.ECharts,
    chartDom: HTMLElement,
    chartdata: Timeline[]
  ) {
    var selectedMonth;
    var selectedFull;

    //ფილტრაცია სამ თვეზე
    if (params.name == 'ThreMonth') {
      myChart.clear();
      var data = chartdata.slice(0, 90);
      selectedMonth = params.selected.ThreMonth = true;
      selectedFull = params.selected.FullTime = false;
      if (chartDom.id == 'main') {
        this.genereteLineChart(data, selectedMonth, selectedFull);
      } else {
        this.genereteBarChart(data, selectedMonth, selectedFull);
      }
    }
    //ფილტრაცია მთლიან პერიოდზე
    else if (params.name == 'FullTime') {
      myChart.clear();
      selectedMonth = params.selected.ThreMonth = false;
      selectedFull = params.selected.FullTime = true;
      if (chartDom.id == 'main') {
        this.genereteLineChart(this.chartData, selectedMonth, selectedFull);
      } else {
        this.genereteBarChart(this.chartData, selectedMonth, selectedFull);
      }
    }
  }
}
