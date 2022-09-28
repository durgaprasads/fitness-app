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
datasetObject=retrieveRecordsChart()
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: datasetObject.labels,
    datasets: [{
      label: 'My First Dataset',
      data: datasetObject.data,
      backgroundColor: [
        'red','blue', 'orange', 'green', 'black'
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
function submitReview(){
  var reviewTA = document.getElementById('product-review').value;
  var productKey = document.getElementById('subject').value; //gets the key from the user
  var ratingValue = document.getElementById('RatingSelect').value; //gets the key from the user
  if((reviewTA && reviewTA.trim().length>1)&&(productKey && productKey.trim().length>1))
  {
    store(reviewTA,productKey,ratingValue)
  }
  else{
    alert("please select product")
  }
}
function store(reviewTA,productKey,ratingValue){ //stores items in the localStorage

  var key=productKey+Date.now();
  var reviewsDataset =retrieveRecords(productKey);
  const reviewObject = {
    reviewId: key,
    review: reviewTA,
    rating:ratingValue,
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
  labels=["Massage Gun","Equalizer Bars","Resistance bands","Exercise Ball","Lifting Chains"]
  for (var x in labels) {
    
    subjectSel.options[subjectSel.options.length] = new Option(labels[x]);
  }
  var ratingSel = document.getElementById("RatingSelect");
  ratingLabels=[5,4,3,2,1]
  for (var x in ratingLabels) {
    ratingSel.options[ratingSel.options.length] = new Option(ratingLabels[x]);
  }
}
function writeRecords(){
  var productKey = document.getElementById('subject').value; //gets the key from the user
  var recordObj=retrieveRecords(productKey)
  const root = document.getElementById('root');
  root.innerHTML="";
  for (var x in recordObj.reviews)
    root.innerHTML += `
    <div class="container-reviews"><br>
        <li>`+new Date(recordObj.reviews[x].dateReviewed).toISOString().split('T')[0]+`: Rating:`+recordObj.reviews[x].rating+`<br>`+recordObj.reviews[x].review +`</li>
    </div>
`;
}
function retrieveRecords(productKey){ //retrieves items in the localStorage
  if(!productKey || ''=== productKey){
    alert("Please select the product");
    return false;
  }
  var records = window.localStorage.getItem(productKey);
  return JSON.parse(records);
}
function retrieveRecordsChart(){
  var records = window.localStorage;
  labels=new Array()
    data=new Array()
  if(records)
  {
    
    for(let i=0;i < window.localStorage.length;i++){
      labels[i]=window.localStorage.key(i)
      data[i]=retrieveRecords(window.localStorage.key(i)).reviews.length
    }
  } reviewObject = {
    labels: labels,
    data: data,
    dateReviewed:Date.now()
  }
  return reviewObject;

}