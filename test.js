var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyYJ7zM4UWu6RYdT'}).base('appAzdZwdzJzHt494');

// const table = base('Census Bureau Business Surveys, Census, and Programs');

var surveys = {}


var loadSurveys =function(){
    
    base('Surveys').select({
        view: "Developer",
        fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Type", "TopicSelect"],
        }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Name'));
            title = record.get('Survey');
            freqs = record.get('Frequency');
            geos = record.get('Geography');
            links = record.get('Link')
            text = record.get('Description');
            var 
        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

    

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    



// // create items
// function createItems() {
//     var $items;
  
//     for (var i=0; i<names.length; i++){
//       var name = names[i];
//       var freq = frequencies[i];
//       var link = links[i];
//       var text = descriptions[i];
//       var geoText = geographies[i];
//       var geo = geoText;
//       geo = geo.replace("Block Group", "BlockGroup");
//       geo = geo.replace("Economic Place", "Economic");
//       geo = geo.replace("Metro Area", "Metro");
//       geo = geo.replace("Census Tract", "Census");
//       geo = geo.replace("Zip Code", "Zip");
//       geo = geo.replace("Other", "OtherGeo");
//       geo = geo.replace(/,/g, '');
  
//       var $item = $("<div />", {
//         "class": "card allfreq " + freq + " " + geo
//       });
//       $item.append("<h5 class='card-header'>" + freq + "</h5>" + 
//       "<div class='card-body'><h5 class=" + "card-title" +">" + 
//       name + "</h5><h6 class='card-subtitle mb-2 text-muted'>Geographies: " + 
//       geoText + "</h6><p class=" + "card-text" + ">" + text + "</p>" + 
//       "<a href=" + link + " class='btn btn-primary'>Explore</a>");
//       $items = $items ? $items.add( $item ) : $item;
//     }
//     $items.appendTo( $("#grid") );
//   }
  
//   $("input[type='checkbox']").change(function(){
//     if($(this).is(":checked")){
//         $(this).parent().addClass("btn-secondary-active"); 
//     }else{
//         $(this).parent().removeClass("btn-secondary-active");  
//     }
//   });


// const getRecords = async () => {
//     var records = await table.select(
//         {view: "View All"}).firstPage();
//     for (i=0; i<records.length; i++){
//         let val = records[i];
//         console.log(val);
//     }
//     // console.log(records);
// }

// const returnRecords = async () => {
//     let arra
// }

// var array = Array.from(new Array(10000).keys()); 

// let arrayLength = array.length;
// for(let i = 0 ; i < arrayLength; i++) {
    
//    let val = array[i];
// }

// getRecords();