// Our labels along the x-axis
// var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// // For drawing the lines
// var africa = [86,114,106,106,107,111,133,221,783,2478];
// var asia = [282,350,411,502,635,809,947,1402,3700,5267];
// var europe = [168,170,178,190,203,276,408,547,675,734];
// var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
// var northAmerica = [6,3,2,2,7,26,82,172,312,433];

var ctx = document.getElementById("myChart").getContext('2d');
console.log(ctx)
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Massage Gun',
      'Equalizer Bars',
      'Resistance bands',
      'Exercise Ball',
      'Lifting Chains'
        ],
    datasets: [{
      label: 'My First Dataset',
      data: [1, 3,2,10,5],
      backgroundColor: [
        'red','blue', 'orange', 'red', 'black'
      ],
      hoverOffset: 4
    }]
  },
  options:{onClick:function(e){
    var activePoints = myChart.getElementsAtEvent(e);
    var selectedIndex = activePoints[0]._index;
    console.log(this.data.labels[selectedIndex]);
    document.getElementById('product-display').innerText = 'Enter Your Valuable Feedback on our Product: '+this.data.labels[selectedIndex]


  }
  }
});
function store(){ //stores items in the localStorage
  var reviewTA = document.getElementById('product-review').value;
  var productKey = document.getElementById('subject').value; //gets the key from the user
  var key=productKey+Date.now();
  var reviewsDataset =retrieveRecords();
  const reviewObject = {
    reviewId: key,
    review: reviewTA,
    dateReviewed:Date.now()
  }
  if(!reviewsDataset){
    reviewsDataset = {
    reviews: new Array(),
    productKey: productKey,
    }  
  }
  reviewsDataset.reviews.push(reviewObject)

  window.localStorage.setItem(productKey,JSON.stringify(reviewsDataset));  
  //converting object to string
}
window.onload =function(){ //ensures the page is loaded before functions are executed.
  var subjectSel = document.getElementById("subject");
  for (var x in myChart.data.labels) {
    console.log(x)
    subjectSel.options[subjectSel.options.length] = new Option(myChart.data.labels[x]);
  }
  document.getElementById("reviewForm").onsubmit = store

}
function writeRecords(){
  var recordObj=retrieveRecords()
  const root = document.getElementById('root');
  root.innerHTML="";
  for (var x in recordObj.reviews)
    root.innerHTML += `
    <div class="container-reviews"><br>
        <p>`+recordObj.reviews[x].review +`</p>
    </div>
`;
}
function retrieveRecords(){ //retrieves items in the localStorage
  var productKey = document.getElementById('subject').value; //gets the key from the user
  console.log("retrieve records");
  var records = window.localStorage.getItem(productKey);
  return JSON.parse(records);
 
}