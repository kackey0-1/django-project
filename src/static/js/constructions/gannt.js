google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);
// 曜日を表す文字列の配列を作っておく
var WeekChars = [ "日", "月", "火", "水", "木", "金", "土" ];
// 日付オブジェクトから曜日を得る
var dObj = new Date(2020, 1, 23);
//var dObj_start = data.getValue(0,3);//始まり日
var wDay = dObj.getDay();
var year = dObj.getFullYear();

function drawChart() {



    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    //月 0~11月、日 0~


    data.addRows([
        ['2014Spring', null, 'spring',
       new Date(2020, 2, 22), new Date(2020, 3, 1), null, 100, null],
       ['2014Summer', null, 'summer',
       new Date(2020, 3, 26), new Date(2020, 3, 8), null, 100, null],
       ['2014Autumn', null, 'autumn',
       new Date(2020, 3, 2), new Date(2020, 3, 15), null, 100, null]
    ]);
    var options = {
        height:200,
        gantt: {
          trackHeight: 50
        }
    };
    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
    chart.draw(data, options);
}



//var table_year = document.getElementById('table_year');


document.getElementById('table_year').innerHTML = year+'年';

//var table_date = document.getElementById('table_year');
document.getElementById('table_date').innerHTML = WeekChars[wDay];



    



 

    

