
function compareFunc(a, b) {
  return a - b;
}
function drawChart() {
  // var url = '/sales/get_project_type';
  // var csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
  // $.ajax({
  //           url: url,
  //           type: 'POST',
  //           dataType: 'json',
  //           headers: {'X-CSRFToken': csrftoken},
  //           timeout: 3000,
  //       }).done(function(data) {
  //           var project_type = data;
  //           alert("a");
  //       }).fail(function(XMLHttpRequest, textStatus, errorThrown) {

  //       });
  // var aa = $('input[name="project_type"]').val();
var aa = $('select[name="user_id"]').val();

  if (aa) {
    var d = new Array(project_type_len);
    
    for (i = 0; i < d.length; i++) {
      d[i] = new Array(2);
    }
    d[0][0] = 'Task';
    d[0][1] = 'Hours per Day';
    for (var i = 1; i < project_type_len; i++) {
      d[i][0] = project_type[i-1];
    }
    for (var j = 1; j < project_type_len; j++) {
      if (employee_sales_results[String(j)]) {
        d[j][1] = Number(employee_sales_results[String(j)]);
      }else{
        d[j][1] = 0;
      }
    }
  }

  
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(amount_by_month)],
    ['目標乖離', Number(target_amount_dif)]
  ]);

  var data2 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(gross_profit_by_month)],
    ['目標乖離', Number(target_gross_profit_dif)]
  ]);

  var data3 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(operating_income)],
    ['目標乖離', Number(target_operating_income_dif)]
  ]);

  if (aa) {
    var data4 = google.visualization.arrayToDataTable(d);
  }

  var options = {
    title: '売上',
    colors: [
      '#FFD700',
      '#FFFACD'
    ],
    legend: { position: 'top'} ,
      'width':  300,                      // 横
      'height': 300 
  };


  var options2 = {
    title: '粗利',
    colors: [
      '#FFD700',
      '#FFFACD'
    ],
    legend: { position: 'top'},
      'width':  300,                      // 横
      'height': 300 
  };

  var options3 = {
    title: '営業利益',
    colors: [
      '#FFD700',
      '#FFFACD'
    ],
    legend: { position: 'top'},
      'width':  300,                      // 横
      'height': 300 
  };

  if (aa) {
    var options4 = {
      title: '当月業種別実績',
      colors: [
        // '#B8860B',
        // '#CD853F',
        // '#DAA520',
        // '#F4A460',
        // '#FFD700',
        // '#FFFACD'
        "#7E5F04",
        "#916D04",
        "#A67D05",
        "#BE9006",
        "#D7A206",
        "#F0B507",
        "#F8C018",
        "#F9C631",
        "#FACD4A",
        "#F9C326",
        "#F9C839",
        "#FACE4C",
        "#FAD35F",
        "#FBD872",
        "#FBDD85",
        "#FCE398",
        "#FDE8AB",
        "#FDEDBE",
        "#FEF2D1",
        "#FEF8E4"
        
      ],
      legend: { position: 'left'},
        'width':  500,                      // 横
        'height': 500,

      chartArea: {left:10},

    };
  }
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  var chart2 = new google.visualization.PieChart(document.getElementById('piechart2'));
  var chart3 = new google.visualization.PieChart(document.getElementById('piechart3'));
  var chart4 = new google.visualization.PieChart(document.getElementById('piechart4'));
  if (Number(target_amount)==0) {
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['', {v:1,f:'0'}],
  ]);
    var options = {
    title: '売上',
    colors: [
      '#ccc'
    ],
    
      'width':  300,                      // 横
      'height': 300,
      legend: { position: 'none'},
      tooltip: { trigger: 'none' },
      pieSliceText: 'none',
  };
  chart.draw(data, options);
  $('#piechart').append("<div style='color: red;' class='error'>目標値を設定してください。</div>")
 }else if (target_amount_dif<0){
    var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(amount_by_month)],
  ]);
    var options = {
    title: '売上',
    colors: [
      '#FFD700'
    ],
    legend: { position: 'top'},
      'width':  300,                      // 横
      'height': 300,
      
  };
  chart.draw(data, options);
 }else {
    chart.draw(data, options);
 }

 if (Number(target_gross_profit)==0) {
    var data2 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['', {v:1,f:'0'}],
  ]);
    var options2 = {
    title: '粗利',
    colors: [
      '#ccc'
    ],
    legend: 'none' ,
      'width':  300,                      // 横
      'height': 300,
      tooltip: { trigger: 'none' },
      pieSliceText: 'none',
  };
  chart2.draw(data2, options2);
  $('#piechart2').append("<div style='color: red;' class='error'>目標値を設定してください。</div>")
 }else if (target_gross_profit_dif<0){
    var data2 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(gross_profit_by_month)],
  ]);
    var options2 = {
    title: '粗利',
    colors: [
      '#FFD700'
    ],
    legend: { position: 'top'},
      'width':  300,                      // 横
      'height': 300,
      
  };
  chart2.draw(data2, options2);
 }

 else {
    chart2.draw(data2, options2);
 }

 if (Number(target_operating_income)==0) {
    var data3 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['', {v:1,f:'0'}],
  ]);
    var options3 = {
    title: '営業利益',
    colors: [
      '#ccc'
    ],
    legend: { position: 'none'} ,
      'width':  300,                      // 横
      'height': 300,
    tooltip: { trigger: 'none' },
    pieSliceText: 'none',
      
  };
  chart3.draw(data3, options3);
  $('#piechart3').append("<div style='color: red;' class='error'>目標値を設定してください。</div>")
 }else if (Number(operating_income)<0){
  var data3 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['目標乖離', Number(target_operating_income)],
  ]);
    var options3 = {
    title: '営業利益',
    colors: [
      '#FFFACD'
    ],
    legend: { position: 'top'} ,
      'width':  300,                      // 横
      'height': 300,
  };
  chart3.draw(data3, options3);

 }
else if (target_operating_income_dif<0){
    var data3 = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['当月実績', Number(operating_income)],
  ]);
    var options3 = {
    title: '営業利益',
    colors: [
      '#FFD700'
    ],
    legend: { position: 'top'},
      'width':  300,                      // 横
      'height': 300,
      
  };
  chart3.draw(data3, options3);
 }
 else {
    chart3.draw(data3, options3);
 }
  if (aa) {
    var count=0;
    for (var k = 1; k < d.length; k++) {
      for (var i = 1; i < d[0].length; i++) {
        if (d[k][i]==0){
          count+=1;
        }
      }
    }if (count==d.length-1){
      var data4 = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['', {v:1,f:'0'}],
      ]);
      var options4 = {
      title: '当月業種別実績',
      colors: [
        '#ccc'
      ],
      legend: { position: 'none'} ,
        'width':  300,                      // 横
        'height': 300,
      tooltip: { trigger: 'none' },
      pieSliceText: 'none',
      chartArea: {left:10},
    }
    chart4.draw(data4, options4);
  }else{
    chart4.draw(data4, options4);

  }
  }


}
     
      

function drawVisualization() {
  // Some raw data (not necessarily accurate)
  var aa = $('select[name="user_id"]').val();

  var data = google.visualization.arrayToDataTable([
    ['月', '実績','目標値'],
    [past_sales_year0 + '年' + past_sales_month0 + '月', Number(past_sales_amount0),Number(past_targets_amount0)],
    [past_sales_year1 + '年' + past_sales_month1 + '月', Number(past_sales_amount1),Number(past_targets_amount1)],
    [past_sales_year2 + '年' + past_sales_month2 + '月', Number(past_sales_amount2),Number(past_targets_amount2)],
    [past_sales_year3 + '年' + past_sales_month3 + '月', Number(past_sales_amount3),Number(past_targets_amount3)],
    [past_sales_year4 + '年' + past_sales_month4 + '月', Number(past_sales_amount4),Number(past_targets_amount4)],
    [past_sales_year5 + '年' + past_sales_month5 + '月', Number(past_sales_amount1),Number(past_targets_amount5)],
    [past_sales_year6 + '年' + past_sales_month6 + '月', Number(past_sales_amount1),Number(past_targets_amount6)],
    [past_sales_year7 + '年' + past_sales_month7 + '月', Number(past_sales_amount2),Number(past_targets_amount7)],
    [past_sales_year8 + '年' + past_sales_month8 + '月', Number(past_sales_amount3),Number(past_targets_amount8)],
    [past_sales_year9 + '年' + past_sales_month9 + '月', Number(past_sales_amount4),Number(past_targets_amount9)],
    [past_sales_year10 + '年' + past_sales_month10 + '月', Number(past_sales_amount3),Number(past_targets_amount10)],
    [past_sales_year11 + '年' + past_sales_month11 + '月', Number(past_sales_amount4),Number(past_targets_amount11)],
  ]);

  var data2 = google.visualization.arrayToDataTable([
    ['月', '実績','目標値'],
    [past_sales_year0 + '年' + past_sales_month0 + '月',Number(past_sales_gross_profit0),Number(past_targets_gross_profit0)],
    [past_sales_year1 + '年' + past_sales_month1 + '月',Number(past_sales_gross_profit1),Number(past_targets_gross_profit1)],
    [past_sales_year2 + '年' + past_sales_month2 + '月',Number(past_sales_gross_profit2),Number(past_targets_gross_profit2)],
    [past_sales_year3 + '年' + past_sales_month3 + '月',Number(past_sales_gross_profit3),Number(past_targets_gross_profit3)],
    [past_sales_year4 + '年' + past_sales_month4 + '月',Number(past_sales_gross_profit4),Number(past_targets_gross_profit4)],
    [past_sales_year5 + '年' + past_sales_month5 + '月',Number(past_sales_gross_profit5),Number(past_targets_gross_profit5)],
    [past_sales_year6 + '年' + past_sales_month6 + '月',Number(past_sales_gross_profit6),Number(past_targets_gross_profit6)],
    [past_sales_year7 + '年' + past_sales_month7 + '月',Number(past_sales_gross_profit7),Number(past_targets_gross_profit7)],
    [past_sales_year8 + '年' + past_sales_month8 + '月',Number(past_sales_gross_profit8),Number(past_targets_gross_profit8)],
    [past_sales_year9 + '年' + past_sales_month9 + '月',Number(past_sales_gross_profit9),Number(past_targets_gross_profit9)],
    [past_sales_year10 + '年' + past_sales_month10 + '月',Number(past_sales_gross_profit10),Number(past_targets_gross_profit10)],
    [past_sales_year11 + '年' + past_sales_month11 + '月',Number(past_sales_gross_profit11),Number(past_targets_gross_profit11)],
  ]);

  var data3 = google.visualization.arrayToDataTable([
    ['月', '実績','目標値'],
    [past_sales_year0 + '年' + past_sales_month0 + '月',Number(operating_income0),Number(past_targets_operating_income0)],
    [past_sales_year1 + '年' + past_sales_month1 + '月',Number(operating_income1),Number(past_targets_operating_income1)],
    [past_sales_year2 + '年' + past_sales_month2 + '月',Number(operating_income2),Number(past_targets_operating_income2)],
    [past_sales_year3 + '年' + past_sales_month3 + '月',Number(operating_income3),Number(past_targets_operating_income3)],
    [past_sales_year4 + '年' + past_sales_month4 + '月',Number(operating_income4),Number(past_targets_operating_income4)],
    [past_sales_year5 + '年' + past_sales_month5 + '月',Number(operating_income5),Number(past_targets_operating_income5)],
    [past_sales_year6 + '年' + past_sales_month6 + '月',Number(operating_income6),Number(past_targets_operating_income6)],
    [past_sales_year7 + '年' + past_sales_month7 + '月',Number(operating_income7),Number(past_targets_operating_income7)],
    [past_sales_year8 + '年' + past_sales_month8 + '月',Number(operating_income8),Number(past_targets_operating_income8)],
    [past_sales_year9 + '年' + past_sales_month9 + '月',Number(operating_income9),Number(past_targets_operating_income9)],
    [past_sales_year10 + '年' + past_sales_month10 + '月',Number(operating_income10),Number(past_targets_operating_income10)],
    [past_sales_year11 + '年' + past_sales_month11 + '月',Number(operating_income11),Number(past_targets_operating_income11)],
  ]);
  if(aa){
    var d2 = new Array(13);
    // alert(Object.keys(past_employee_sales_results).length)
    for (i = 0; i < d2.length; i++) {
      d2[i] = new Array(past_employee_sales_results+1);
    }
    d2[0][0] = 'Month';
    var count=1;
    for (var i = 1; i < project_type_len; i++) {
      for (var j = 0; j < exist_project_type.length ; j++) {
  
        if (i==exist_project_type[j]) {
          d2[0][count] = project_type[i-1];
          count+=1;
        
        }
      }
    }
    
    var sorted_exist_project_type = exist_project_type.sort(compareFunc);
    month2=1;
    for (var j = 1; j < 13; j++) {
      year = Number(past_sales_year0);
      month = Number(past_sales_month0)+j-1;
      if (month>12){
        year2 = year + 1;
        
        if (month2==2){
          d2[j][0] = year2 + '年' + month2 + '月';
        }else if(month2==3){
          d2[j][0] = year2 + '年' + month2 + '月';
        }else{
          d2[j][0] = year2 + '年' + month2 + '月';
        }
        
        
      }else{
        d2[j][0] = year + '年' + month + '月';
      }
       
  

      // alert(d2);
      for (var k = 0; k < exist_project_type.length; k++) {
        if(month==4){
          if (past_employee_sales_results4[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results4[String(sorted_exist_project_type[k])]);
          }
        }else if(month==5){
          if (past_employee_sales_results5[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results5[String(sorted_exist_project_type[k])]);
          }
        }else if(month==6){
          if (past_employee_sales_results6[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results6[String(sorted_exist_project_type[k])]);
          }
        }else if(month==7){
          if (past_employee_sales_results7[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results7[String(sorted_exist_project_type[k])]);
          }
        }else if(month==8){
          if (past_employee_sales_results8[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results8[String(sorted_exist_project_type[k])]);
          }
        }else if(month==9){
          if (past_employee_sales_results9[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results9[String(sorted_exist_project_type[k])]);
          }
        }else if(month==10){
          if (past_employee_sales_results10[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results10[String(sorted_exist_project_type[k])]);
          }
        }else if(month==11){
          if (past_employee_sales_results11[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results11[String(sorted_exist_project_type[k])]);
          }
        }else if(month==12){
          if (past_employee_sales_results12[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results12[String(sorted_exist_project_type[k])]);
          }
        }else if(month==1){
          if (past_employee_sales_results1[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results1[String(sorted_exist_project_type[k])]);
          }
        }else if(month==2){
          if (past_employee_sales_results2[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results2[String(sorted_exist_project_type[k])]);
          }
        }else if(month==3){
          if (past_employee_sales_results3[String(sorted_exist_project_type[k])]) {
            d2[j][k+1] = Number(past_employee_sales_results3[String(sorted_exist_project_type[k])]);
          }
        }
        
      }
      month2+=1;
      
    }
    
    for (var k = 1; k < d2.length; k++) {
      for (var i = 1; i < d2[0].length; i++) {
        if (d2[k][i]==null){
          d2[k][i]=0;
        }
      }
    }
    if(d2[0]=="Month"){
      var data4 = google.visualization.arrayToDataTable([
                  ['月', '',''],
                  [past_sales_year0 + '年' + past_sales_month0+ '月',0,0],
                  [past_sales_year1 + '年' + past_sales_month1,0,0] ,
                  [past_sales_year2 + '年' + past_sales_month2 + '月',0,0],
                  [past_sales_year3 + '年' + past_sales_month3 + '月',0,0],
                  [past_sales_year4 + '年' + past_sales_month4 + '月',0,0],
                  [past_sales_year5 + '年' + past_sales_month5 + '月',0,0],
                  [past_sales_year6 + '年' + past_sales_month6 + '月',0,0],
                  [past_sales_year7 + '年' + past_sales_month7 + '月',0,0],
                  [past_sales_year8 + '年' + past_sales_month8 + '月',0,0],
                  [past_sales_year9 + '年' + past_sales_month9 + '月',0,0],
                  [past_sales_year10 + '年' + past_sales_month10 + '月',0,0],
                  [past_sales_year11 + '年' + past_sales_month11 + '月',0,0],
                  ]);
     var options4 = {
    title:'過去実績',
    vAxis: {title: '(万)'},
    hAxis: {title: '(月)'},
    seriesType: 'bars',
    // series: {5: {type: 'line'}},
    legend: { position: 'right'},
    bar: { groupWidth: '75%' },
    isStacked: true,
    

    colors: [
    // '#B8860B',
    // '#CD853F',
    // '#DAA520',
    // '#F4A460',
    // '#FFD700',
    // '#FFFACD'
        "#7E5F04",
        "#916D04",
        "#A67D05",
        "#BE9006",
        "#D7A206",
        "#F0B507",
        "#F8C018",
        "#F9C631",
        "#FACD4A",
        "#F9C326",
        "#F9C839",
        "#FACE4C",
        "#FAD35F",
        "#FBD872",
        "#FBDD85",
        "#FCE398",
        "#FDE8AB",
        "#FDEDBE",
        "#FEF2D1",
        "#FEF8E4"
    ]
  };
    var chart4 = new google.visualization.ComboChart(document.getElementById('chart_div4'));

      chart4.draw(data4, options4);
    }else{
    
    var data4 = google.visualization.arrayToDataTable(d2);
    var options4 = {
    title:'過去実績',
    vAxis: {title: '(万)'},
    hAxis: {title: '(月)'},
    seriesType: 'bars',
    // series: {5: {type: 'line'}},
    legend: { position: 'right'},
    bar: { groupWidth: '75%' },
    isStacked: true,
    

    colors: [
    // '#B8860B',
    // '#CD853F',
    // '#DAA520',
    // '#F4A460',
    // '#FFD700',
    // '#FFFACD'
        "#7E5F04",
        "#916D04",
        "#A67D05",
        "#BE9006",
        "#D7A206",
        "#F0B507",
        "#F8C018",
        "#F9C631",
        "#FACD4A",
        "#F9C326",
        "#F9C839",
        "#FACE4C",
        "#FAD35F",
        "#FBD872",
        "#FBDD85",
        "#FCE398",
        "#FDE8AB",
        "#FDEDBE",
        "#FEF2D1",
        "#FEF8E4"
    ]
  };
  var chart4 = new google.visualization.ComboChart(document.getElementById('chart_div4'));
  
  chart4.draw(data4, options4);
  
  }
  }
  // var data4 = google.visualization.arrayToDataTable([
  //   ['住宅', '外壁', 'ヨガ', '美容室', '居酒屋',
  //    '物販', { role: 'annotation' } ],
  //   [past_employee_sales_year1 + '年' + past_employee_sales_month1, Number(past_employee_sales_amount1), Number(past_employee_sales_amount2), Number(past_employee_sales_amount3), Number(past_employee_sales_amount4), Number(past_employee_sales_amount5), ''],
  //   [past_employee_sales_year2 + '年' + past_employee_sales_month2, Number(past_employee_sales_amount1), Number(past_employee_sales_amount2), Number(past_employee_sales_amount3), Number(past_employee_sales_amount4), Number(past_employee_sales_amount5), ''],
  //   [past_employee_sales_year3 + '年' + past_employee_sales_month3, Number(past_employee_sales_amount1), Number(past_employee_sales_amount2), Number(past_employee_sales_amount3), Number(past_employee_sales_amount4), Number(past_employee_sales_amount5), ''],
  // ]);

  var options = {
    title : '売上',
    vAxis: {title: '(万)'},
    hAxis: {title: '(月)'},
    seriesType: 'bars',
    series: {1: {type: 'line'}},
    colors: [
    '#FFD700'
    ],
    legend: { position: 'top'}        };

  var options2 = {
    title : '粗利',
    vAxis: {title: '(万)'},
    hAxis: {title: '(月)'},
    seriesType: 'bars',
    series: {1: {type: 'line'}},
    colors: [
    '#FFD700'
    ],
    legend: { position: 'top'}        };

  var options3 = {
    title : '営業利益',
    vAxis: {title: '(万)'},
    hAxis: {title: '(月)'},
    seriesType: 'bars',
    series: {1: {type: 'line'}},
    colors: [
    '#FFD700'
    ],
    legend: { position: 'top'}        };

  

  
  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  var chart2 = new google.visualization.ComboChart(document.getElementById('chart_div2'));
  var chart3 = new google.visualization.ComboChart(document.getElementById('chart_div3'));
  // var chart4 = new google.visualization.ComboChart(document.getElementById('chart_div4'));

  chart.draw(data, options);
  chart2.draw(data2, options2);
  chart3.draw(data3, options3);
  
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawVisualization);