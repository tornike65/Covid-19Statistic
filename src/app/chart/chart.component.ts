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
import { Timeline } from '../models/Timeline.model';
import { selectRouteParams } from '..//store/selectors/router.selector';
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
    FullTime?: boolean,
  ) {
    const chartDom = document?.getElementById('main') as HTMLElement;
    const myChart = echarts.init(chartDom);

    const option = {
      color: ['#5470c6', '#91cc75', '#ee6666', '#eee6521'],

      tooltip: {
        trigger: 'axis',
      },

      legend: {
        data: ['Confirm', 'Recovery', 'Death', 'ThreeMonths', 'FullTime'],
        itemWidth: 10,
        selected: {
          ThreeMonths: mmonth,
          FullTime: FullTime == null ? true : FullTime,
        },
      },

      xAxis: {
        type: 'category',
        data: chartdata.map((x) => x.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirm',
          type: 'line',
          data: chartdata.map((x) => x.confirmed),
          triggerEvent: true,
        },
        {
          name: 'Recovery',
          type: 'line',
          data: chartdata.map((x) => x.recovered),
        },
        {
          name: 'Death',
          type: 'line',
          data: chartdata.map((x) => x.deaths),
        },
        {
          name: 'ThreeMonths',
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
    myChart.on('legendselectchanged', (params: any) => {
      this.filterData(params, myChart, chartDom, chartdata);
    });

    window.addEventListener('resize', function () {
      myChart.resize();
    });
    myChart.setOption(option);
  }
  // bar chart - ის ინიციალიზება
  genereteBarChart(
    chartdata: Timeline[],
    mmonth?: boolean,
    FullTime?: boolean,
  ) {
    const chartDom = document?.getElementById('main2') as HTMLElement;
    const myChart = echarts?.init(chartDom);

    const option = {
      color: ['#5470c6', '#91cc75', '#ee6666'],

      tooltip: {
        trigger: 'axis',
      },

      legend: {
        data: ['Confirm', 'Recovery', 'Death', 'ThreeMonths', 'FullTime'],
        itemWidth: 10,
        selected: {
          ThreeMonths: mmonth,
          FullTime: FullTime == null ? true : FullTime,
        },
      },

      xAxis: {
        type: 'category',
        data: chartdata.map((x) => x.date),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Confirm',
          type: 'bar',
          data: chartdata.map((x) => x.new_confirmed),
        },
        {
          name: 'Recovery',
          type: 'bar',
          data: chartdata.map((x) => x.new_recovered),
        },
        {
          name: 'Death',
          type: 'bar',
          data: chartdata.map((x) => x.new_deaths),
        },
        {
          name: 'ThreeMonths',
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

    myChart.on('legendselectchanged', (params: any) => {
      this.filterData(params, myChart, chartDom, chartdata);
    });

    window.addEventListener('resize', function () {
      myChart.resize();
    });

    myChart.setOption(option);
  }

  // მიმდინარე როურის შემოწმება და chart-ის გენერაცია
  checkRoute(data: Timeline[]) {
    // როუტიდან პარამეტრის ვიღებთ რათა გავარკვიოთ რომელ pege-ზე ვიმყოფეიბით,
    // რომ შესაბამისი chart-ი დავაგენერიროთ
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
          'block',
        );
      }
    });
  }

  // chart - ის მონაცემების ფილტრაცია

  filterData(
    params: any,
    myChart: echarts.ECharts,
    chartDom: HTMLElement,
    chartdata: Timeline[],
  ) {
    let selectedMonth;
    let selectedFull;

    // ფილტრაცია სამ თვეზე
    if (params.name === 'ThreeMonths') {
      myChart.clear();
      const data = chartdata.slice(0, 90);
      selectedMonth = params.selected.ThreeMonths = true;
      selectedFull = params.selected.FullTime = false;
      if (chartDom.id === 'main') {
        this.genereteLineChart(data, selectedMonth, selectedFull);
      } else {
        this.genereteBarChart(data, selectedMonth, selectedFull);
      }
    } else if (params.name === 'FullTime') {
      myChart.clear();
      selectedMonth = params.selected.ThreeMonths = false;
      selectedFull = params.selected.FullTime = true;
      if (chartDom.id === 'main') {
        this.genereteLineChart(this.chartData, selectedMonth, selectedFull);
      } else {
        this.genereteBarChart(this.chartData, selectedMonth, selectedFull);
      }
    }
  }
}
