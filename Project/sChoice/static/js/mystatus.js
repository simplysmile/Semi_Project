

$(function(){
    $.ajax({
        url:"/dailycheck/myStatusData",
        dataType:"json",
        success:function(data){

            console.log(data)


            // 달성일, 몸무게 차트 
            const goal_txt = {
                id: 'goal_txt',
                beforeDraw(chart, args, options) {
                  const { ctx, chartArea: { top, right , bottom, left, width, height } } = chart;
                  ctx.save();
                  ctx.fillStyle = 'black';
                  ctx.fillRect(width / 2, top + (height / 2), 0, 0);
                  ctx.font = '50px sans-serif';
                  ctx.textAlign = 'center';     
                  var daystr = String(data.workoutday)+'/'+String(data.goal_period) +' 일'
                  var kgstr = data.goal_weight+'까지 '+String(data.weight[0]-data.goal_weight)+'kg'
                  ctx.fillText(daystr, width / 2 +(left), top + (height / 2)+70);
                  ctx.fillText(kgstr, width / 2 +(left), top + (height / 2)+120);
                }

            };

           

            const ctx_goal = document.getElementById('goalchart').getContext('2d');
            const goalchart = new Chart(ctx_goal, {
                type: 'doughnut', 
                data: {
                    labels: ['done','remain'],
                    datasets: 
                    [
                        {
                            label: '날짜',
                            data: [data.workoutday,(data.goal_period-data.workoutday),0,0],
                            backgroundColor: ['#8C5A76','#eee'],
                            cutout: "95%",
                            //hoverOffset: 5,    
                            rotation: -120,
                            circumference: 240,
                            
                        },
                        {
                            label: '몸무게',
                            data: [0,0,(data.firstweight-data.goal_weight)-(data.weight[0]-data.goal_weight),(data.weight[0]-data.goal_weight)],
                            backgroundColor: ['#6D80A6','#eee'],
                            cutout: "90%",
                            //hoverOffset: 5,    
                            rotation: -120,
                            circumference: 240,
                        },
                        
                    ],
                },//data.
                options: {
                
                    plugins: {
                        
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    },
                }
                            
                },
                  
               plugins: [goal_txt],

            }); // 달성일, 몸무게 차트 
            

            // 몸무게 라인 그래프 
            var lenw = data.weight.length
            var goalw = []
            var currw=[]
            var currdays=[]
            for (var i = 0 ; i<lenw ; i++)
            {
                goalw.push(data.goal_weight)
                currw.push(data.weight[lenw-i-1])
                currdays.push(data.alldays[lenw-i-1])

            }

            const ctxW = document.getElementById('weightchange').getContext('2d');
            const labels_weight = currdays
            const weightchange = new Chart(ctxW, {
                type: 'line', 
                data: {
                    labels: labels_weight,
                    datasets: [
                    {
                        label: '몸무게 변화추이',
                        data: currw,
                        borderColor: ['rgb(255, 99, 132)'],
                        backgroundColor:['rgba(255, 99, 132, 0.2)']
                    },
                    {
                        label: '목표몸무게',
                        data: goalw,
                        borderColor: ['rgba(54, 162, 235)'],
                        backgroundColor:['rgba(54, 162, 235, 0.2)']
                    }
                
                ],
                },//data.
               
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            max: data.firstweight + 1 ,
                            min: data.goal_weight -5,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                                       
                }
            }); // 몸무게 라인차트



            var meal_keys = Object.keys(data.mealweak.m_cal)
            var exer_keys = Object.keys(data.exerweak.m_cal)
            var eatweek=[]
            var exerweek=[]
            var exergoalweek=[]
            var goalweek=[]
            var week = new Array('일','월','화','수','목','금','토','일','월','화','수','목','금','토')
            var d = new Date();
            //alert(week[d.getDay()])
            var titleweek = []

            for (var i = 0; i<meal_keys.length;i++){
                eatweek.push(data.mealweak.m_cal[meal_keys[i]])
                goalweek.push(data.goalMeal)
                
                titleweek.push(week[(d.getDay())+1+i])
                
            }

            for (var i = 0; i<exer_keys.length;i++){
                exerweek.push(data.exerweak.m_cal[exer_keys[i]])
                exergoalweek.push(data.goalEx)                
            }
            
            
            
            var mealpercentage = (data.mealpercent)
            var exerpercentage = (data.exerpercent)

            console.log(exerpercentage)




        // --------------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------------
        // --------------------------------------식단part----------------------------------------------------
        // --------------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------------
         

        
        
        const textinsert = {
            id: 'textinsert',
            beforeDraw(chart, args, options) {
              const { ctx, chartArea: { top, right , bottom, left, width, height } } = chart;
              ctx.save();
              ctx.fillStyle = 'black';
              ctx.fillRect(width / 2, top + (height / 2), 0, 0);
              ctx.font = '10px sans-serif';
              ctx.textAlign = 'center';     
              
              ctx.fillText(mealpercentage +"%", width / 2 +(left), top + (height / 2));
            }
        };
            // doughnut chart 
            const ctx_meal = document.getElementById('mealChart').getContext('2d');
            const mealChart = new Chart(ctx_meal, {
                type: 'doughnut', 
                data: {
                    labels: ['done','remain'],
                    datasets: [{
                        label: '칼로리',
                        data: [mealpercentage,(100-mealpercentage),0,0,0],
                        backgroundColor: ['#7CCAAE','#eee'],
                        cutout: "80%",    
                    }],
                },//data.
                options: {
                    aspectRatio: 1,
                    layout: {
                        padding: {
                            left: 70,
                            right: 70,
                            top: 0,
                            bottom: 10,
                        }
                    },
                    plugins: {
                        legend: {                       
                            display: false,
                        },                        
                        title: {
                            display: false,
                        },
                        tooltips: {
                            enabled: false
                        },
                    }, 
                },
                plugins: [textinsert],
                
            }); // doughnut chart 
            
            




            const ctx_b_m = document.getElementById('weeklyBarChart_meal').getContext('2d');
            const labelsW = titleweek
            const mealWeekChart = new Chart(ctx_b_m, {
                type: 'bar', 
                data: {
                    labels: labelsW,
                    datasets: [
                    {
                        label: '달성현황',
                        data: eatweek,
                        backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                        ],
                        borderWidth: 5,
                        borderSkipped: false,
                        borderRadius: {
                            topLeft: 100,
                            topRight: 100,
                            bottomRight: 25,
                            bottomLeft: 25,
                        },
                        

                    },
                    {
                        label: '목표',
                        data: goalweek,
                        backgroundColor: ['#eee','#eee','#eee','#eee','#eee','#eee','#eee'],
                        borderWidth: 5,
                        borderSkipped: false,
                        borderRadius: {
                            topLeft: 100,
                            topRight: 100,
                            bottomRight: 25,
                            bottomLeft: 25,
                        },


                    }


                    
                    
                    ],
                },//data.
               
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            
                            stacked: true
                         },
                        
                         y: {
                            display: false,
                            
                         },

                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            display:false
                        }],
                        yAxes:[{
                            ticks:{
                                min:0,
                                max:100,
                                stepSize:10,
                                display: false
                            },
                            scaleLabel:{
                                display: false
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            display:false
                        }]

                    },
                    plugins: {
                        legend: {
                           
                            display: false,
                        },
                    }    



                    
                },
                
            }); // doughnut chart 


        // --------------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------------
        // --------------------------------------운동part----------------------------------------------------
        // --------------------------------------------------------------------------------------------------
        // --------------------------------------------------------------------------------------------------

        const textinsert_exer = {
            id: 'textinsert_exer',
            beforeDraw(chart, args, options) {
              const { ctx, chartArea: { top, right , bottom, left, width, height } } = chart;
              ctx.save();
              ctx.fillStyle = 'black';
              ctx.fillRect(width / 2, top + (height / 2), 0, 0);
              ctx.font = '10px sans-serif';
              ctx.textAlign = 'center';     
              
              ctx.fillText(exerpercentage+'%', width / 2 +(left), top + (height / 2));
            }
        };

        // doughnut chart 
        const ctx_exer = document.getElementById('exerChart').getContext('2d');
        const exerChart = new Chart(ctx_exer, {
            type: 'doughnut', 
            data: {
                labels: ['done','remain'],
                datasets: [{
                    label: '칼로리',
                    data: [exerpercentage,(100-exerpercentage),0,0,0],
                    backgroundColor: ['#7CCAAE','#eee'],
                    cutout: "80%",    
                }],
            },//data.
            options: {
                
                aspectRatio: 1,
                layout: {
                    padding: {
                        left: 70,
                        right: 70,
                        top: 0,
                        bottom: 10,
                    }
                },

                plugins: {
                legend: {
                   
                    display: false,
                },
            
                title: {
                    display: false,
                },
                tooltips: {
                    enabled: false
                 },
                rotation: 1.5 * Math.PI
            }
            },
            plugins: [textinsert_exer],
        }); // doughnut chart 
        




        const ctx1 = document.getElementById('weeklyBarChart_exer').getContext('2d');
        
        const myChart1 = new Chart(ctx1, {
            type: 'bar', 
            data: {
                labels: labelsW,
                datasets: [
                {
                    label: '달성현황',
                    data: exerweek,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                    ],
                    borderWidth: 5,
                    borderSkipped: false,
                    borderRadius: {
                        topLeft: 100,
                        topRight: 100,
                        bottomRight: 25,
                        bottomLeft: 25,
                    },
                    

                },
                {
                    label: '목표',
                    data: exergoalweek,
                    backgroundColor: ['#eee','#eee','#eee','#eee','#eee','#eee','#eee'],
                    borderWidth: 5,
                    borderSkipped: false,
                    borderRadius: {
                        topLeft: 100,
                        topRight: 100,
                        bottomRight: 25,
                        bottomLeft: 25,
                    },


                }


                
                
                ],
            },//data.
           
            options: {
                responsive: true,
                scales: {
                    x: {
                        
                        stacked: true
                     },
                    
                     y: {
                        display: false,
                        
                     },

                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        display:false
                    }],
                    yAxes:[{
                        ticks:{
                            min:0,
                            max:100,
                            stepSize:10,
                            display: false
                        },
                        scaleLabel:{
                            display: false
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        display:false
                    }]

                },
                plugins: {
                    legend: {
                       
                        display: false,
                    },
                }    



                
            }
        }); // doughnut chart 



         


            
        },
                    
        error:function(){

        }
    })//ajax

})//function
