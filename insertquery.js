// var doc = { 
//  	username: 'koffi',
//     password : sha256('koffi1')
// };
var Datastore = require('nedb');
var db_sondage = new Datastore({ filename: './sondage.db', autoload: true });

// var sondage = {
// 	nom: 'koffi',
// 	age: 19,
// 	genre: 'M'
// };

// for (var i = 0; i <= 10; i++) {
// 	db_sondage.insert(sondage, function(err, newDoc) {
// 		if (err)
// 		console.log(err);
// 		console.log('ok')
// 	});
// }


Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

db_sondage.find({}, function (err, sondages) {
	const groupedByAge = sondages.groupBy('age')
	const groupedByGenre = sondages.groupBy('genre')

	console.log(groupedByGenre['M'].length)
	console.log(groupedByAge)
	

	var Chart = require('chart.js');
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["M", "F"],
	        datasets: [{
	            label: '# of Votes',
	            data: [groupedByGenre['M'].length, groupedByGenre['F'].length],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});


	var ctx2 = document.getElementById("myChart2");
	var myChart2 = new Chart(ctx2, {
	    type: 'bar',
	    data: {
	        labels: ["17", "19", "20"],
	        datasets: [{
	            label: '# of Votes',
	            data: [groupedByAge['17'].length, groupedByAge['19'].length, groupedByAge['20'].length],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
});

