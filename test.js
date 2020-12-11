var Airtable = require('airtable');
// Get a base ID for an instance of art gallery example
var base = new Airtable({ apiKey: 'keyYJ7zM4UWu6RYdT' }).base('appAzdZwdzJzHt494');


var createSurveys = function() {
    $('#surveys').empty();

    base('Surveys').select({
        view: "Developer",
        fields: ["Survey", "Description", "Link", "Frequency", "Geography", "Type", "TopicSelect"],
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            console.log('Retrieved ', record.get('Name'));

            surveyname = record.get('Survey');
            freqs = record.get('Frequency').join(', ');
            geos = record.get('Geography').join(', ');
            link = record.get('Link')
            text = record.get('Description');

            geosfilter = geos.replace("Block Group", "BlockGroup");
            geosfilter = geosfilter.replace("Economic Place", "Economic");
            geosfilter = geosfilter.replace("Metro Area", "Metro");
            geosfilter = geosfilter.replace("Census Tract", "Census");
            geosfilter = geosfilter.replace("Zip Code", "Zip");
            geosfilter = geosfilter.replace("Other", "OtherGeo");
            geosfilter = geosfilter.replace(/,/g, '');

            var linktext = "Explore Now";
            

            var $card= $('<div/>', {
                id: 'some-id',
                "class": freqs + ' ' + geosfilter + ' card card-body',
                title: surveyname
            });
            
            $card.append($("<h5 class='card-title'>").text(surveyname));

            $card.append($("<h6 class='card-subtitle mb-2 text-muted'>").text('Frequency: ' + freqs)); 
            $card.append($("<h6 class='card-subtitle mb-2 text-muted'>").text('Geography: ' + geos)); 
            $card.append($("<p class='card-text'>").text(text)); 

            $card.append("<div class='btn btn-primary'" + linktext.link(link) + "</div>");



            $('#surveys').append($card);
        });

        fetchNextPage();
    }, function done(error) {
        console.log(error);
    });
};

createSurveys();

