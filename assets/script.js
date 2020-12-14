var grid=$("#surveys");
var filter=$(".btn-group input");
var search=$(".quicksearch");
var qsRegex;
var buttonFilter;

var names = [
  "American Community Survey",
  "Annual Business Survey",
  "Annual Survey of Manufactures",
  "Building Permits",
  "Business Dynamics Statistics",
  "Commodity Flow Survey",
  "County Business Patterns",
  "Decennial Census",
  "e-Commerce Statistics",
  "Economic Census",
  "Job-to-Job Flows",
  "LEHD Origin-Destination Employment Statistics",
  "Manufacturers' Shipments, Inventories, and Orders",
  "Monthly Retail Trade Survey",
  "Monthly Wholesale Trade Survey",
  "New Residential Construction",
  "New Residential Sales",
  "Nonemployer Statistics",
  "Quarterly Financial Report",
  "Quarterly Workforce Indicators",
  "U.S. International Trade in Goods and Services"
]

var frequencies = [
  "Annual", 
  "Annual",
  "Annual",
  "Monthly",
  "Annual",
  "Other",
  "Decennial",
  "Annual",
  "Other",
  "Monthly",
  "Quarterly",
  "Annual",
  "Monthly",
  "Monthly",
  "Monthly",
  "Annual",
  "Monthly",
  "Monthly",
  "Quarterly",
  "Quarterly",
  "Quarterly"
];

var geographies = [
  "National, State, Metro Area, County, Place",
  "National, State, Metro Area, County, Place, ZCTA, Tract, Block Group, Other",
  "National, State",
  "National, State, Metro Area",
  "National, State, Metro Area, County, Place, Other",
  "National, State, Metro Area, County, Zip Code, Other",
  "National, State, Other",
  "National, State, County, Place, ZCTA, Tract, Block Group, Block, Other",
  "National",
  "National, State, Metro Area, County, Economic Place, Place",
  "National, State, Metro Area, Other",
  "National, State, Metro Area",
  "National, State, Metro Area, County, Place, ZCTA, Tract, Block Group, Block, Other",
  "National",
  "National",
  "National",
  "National, State, Metro Area, County",
  "National, Other",
  "National, Other",
  "National",
  "National, State, Metro Area, County, Other",
];

var links = [
  "https://www.census.gov/programs-surveys/abs/about.html",
  "https://www.census.gov/programs-surveys/acs.html",
  "https://www.census.gov/programs-surveys/asm.html",
  "https://www.census.gov/programs-surveys/bds.html",
  "https://www.census.gov/programs-surveys/bps.html",
  "https://www.census.gov/programs-surveys/cbp.html",
  "https://www.census.gov/programs-surveys/cfs.html",
  "https://www.census.gov/programs-surveys/decennial-census.html",
  "https://www.census.gov/programs-surveys/e-stats.html",
  "https://www.census.gov/programs-surveys/economic-census.html",
  "https://www.census.gov/foreign-trade/Press-Release/current_press_release/index.html",
  "https://lehd.ces.census.gov/data/#j2j",
  "https://lehd.ces.census.gov/data/#lodes",
  "https://www.census.gov/manufacturing/m3/index.html",
  "https://www.census.gov/retail/index.html",
  "https://www.census.gov/wholesale/index.html",
  "https://www.census.gov/programs-surveys/nonemployer-statistics.html",
  "https://www.census.gov/construction/nrc/index.html",
  "https://www.census.gov/construction/nrs/index.html",
  "https://www.census.gov/econ/qfr/",
  "https://www.census.gov/data/developers/data-sets/qwi.html"
]

var descriptions = [
  "The American Community Survey (ACS) is an ongoing survey that provides vital information on a yearly basis about our nation and its people. The survey samples approximately 3.5 million addresses each year. Information from the survey generates data that help determine how more than $675 billion in federal and state funds are distributed each year.",
  "The Annual Business Survey (ABS) provides information on selected economic and demographic characteristics for businesses and business owners by sex, ethnicity, race, and veteran status. Further, the survey measures research and development (for microbusinesses), new business topics such as innovation and technology, as well as other business characteristics.",
  "The Annual Survey of Manufactures (ASM) provides sample estimates of statistics for all manufacturing establishments with one or more paid employee.",
  "The Building Permits Survey measures the number of new housing units authorized by building permits. Data are available monthly, year- to- date, and annually at the national, state, selected metro areapolitan area, county and place levels. The data are from the Building Permits Survey.",
  "Business Dynamics Statistics (BDS) provides annual measures of business dynamics (such as job creation and destruction, establishment births and deaths, and firm startups and shutdowns) for the economy and aggregated by establishment and firm characteristics.",
  "Commodity Flow Survey (CFS) data are used by policy makers and transportation planners in various federal, state, and local agencies for assessing the demand for transportation facilities and services, energy use, and safety risk and environmental concerns.",
  "County Business Patterns (CBP) is an annual series that provides subnational economic data by industry. This series includes the number of establishments, employment during the week of March 12, first quarter payroll, and annual payroll.",
  "The U.S. census counts each resident of the country, where they live on April 1, every ten years ending in zero. The Constitution mandates the enumeration to determine how to apportion the House of Representatives among the states.",
  "Measuring the Electronic Economy. E-commerce statistics on shipments, sales and revenues from key sectors of the economy: manufacturing, wholesale, services and retail. These statistics are available for the nation dating back to 1998. The Census Bureau's e-commerce report measures the value of goods and services sold online whether over open networks such as the Internet, or over proprietary networks running systems such as Electronic Data Interchange (EDI).",
  "The U.S. Census Bureau collects extensive statistics about businesses that are essential to understanding the American economy.  This official count, better known as the Economic Census, serves as the foundation for the measurement of U.S. businesses and their economic impact. Conducted every 5 years, nearly 4 million businesses, large, medium, and small, covering most industries and all geographic areas of the United States will receive surveys tailored to their primary business activity.",
  "Job-to-Job Flows (J2J) is a set of statistics on job mobility in the United States. J2J include statistics on: (1) the job-to-job transition rate, (2) hires and separations to and from employment, (3) earnings changes due to job change, and (4) characteristics of origin and destination jobs for job-to-job transitions. These statistics are available at the national, state, and metro areapolitan area levels and by worker and firm characteristics.",
  "LEHD Origin-Destination Employment Statistics (LODES) used by the tool, OnTheMap, provide details about where workers are employed, where they live, and the relationships between the two.",
  "The Manufacturers’ Shipments, Inventories, and Orders (M3) survey provides broad-based, monthly statistical data on economic conditions in the domestic manufacturing sector. The survey measures current industrial activity and provides an indication of future business trends.",
  "The Monthly Retail Trade Survey (MARTS) provides current estimates of sales at retail and food services stores and inventories held by retail stores. The United States Code, Title 13, authorizes this survey and provides for voluntary responses.",
  "The Wholesale Trade sector comprises establishments engaged in wholesaling merchandise, generally without transformation, and rendering services incidental to the sale of merchandise. The merchandise described in this sector includes the outputs of agriculture, mining, manufacturing, and certain information industries, such as publishing.",
  "This survey provides national and regional data on the number of new housing units authorized by building permits; authorized, but not started; started; under construction; and completed. The data are for new, privately-owned housing units, excluding HUD-code manufactured (mobile) homes.",
  "This survey provides national and regional data on the number of new single-family houses sold and for sale. It also provides national data on median and average prices, the number of houses sold and for sale by stage of construction, and other statistics.",
  "Nonemployer Statistics (NES) is an annual series that provides subnational economic data for businesses that have no paid employees and are subject to federal income tax. The data consist of the number of businesses and total receipts by industry. Most nonemployers are self-employed individuals operating unincorporated businesses (known as sole proprietorships), which may or may not be the owner's principal source of income.",
  "The majority of all business establishments in the United States are nonemployers, yet these firms average less than 4 percent of all sales and receipts nationally. Due to their small economic impact, these firms are excluded from most other Census Bureau business statistics (the primary exception being the Survey of Business Owners). The NES series is the primary resource available to study the scope and activities of nonemployers at a detailed geographic level.",
  "The Quarterly Workforce Indicators (QWI) provide local labor market statistics by industry, worker demographics, employer age and size. Unlike statistics tabulated from firm or person-level data, the QWI source data are unique job-level data that link workers to their employers. Because of this link, labor market data in the QWI is available by worker age, sex, educational attainment, and race/ethnicity.",
  "U.S. International Trade in Goods and Services provides summary statistics for goods on a census, balance of payment basis, and services data each month. This includes data for the most recent month and year on goods by various commodity classifications, and by country of destination. Annual revisions are released in June of the following year."
]

createItems();


Isotope.Item.prototype._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };
  this.sortData = {};
};

Isotope.Item.prototype.layoutPosition = function() {
  this.emitEvent( 'layout', [ this ] );
};

Isotope.prototype.arrange = function( opts ) {
  // set any options pass
  this.option( opts );
  this._getIsInstant();
  // just filter
  this.filteredItems = this._filter( this.items );
  // flag for initalized
  this._isLayoutInited = true;
};

// layout mode that does not position items
Isotope.LayoutMode.create('none');

// filter items 
grid.isotope({
  itemSelector: ".card-body",
  layoutMode: 'none',
  stagger: 0,
  filter: function() {
    // console.log(searchResult);
    var searchResult = qsRegex ? $(this).text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $(this).is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

// use value of search field to filter
var quicksearch = search.keyup( debounce( function() {
  qsRegex = new RegExp( quicksearch.val(), "gi" );
  grid.isotope();
}, 200 ) );

// debounce so filtering doesn"t happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
  if ( timeout ) {
    clearTimeout( timeout );
  }
  function delayed() {
    fn();
    timeout = null;
  }
  timeout = setTimeout( delayed, threshold || 100 );
  };
}

// change filters
filter.change(function(){
  var filters = [];
  filter.filter(":checked").each(function(){
    filters.push( this.value );
  });
  filters = filters.join("");
  buttonFilter = filters;
  grid.isotope();
});

// // create items
function createItems() {
  var $items;

  for (var i=0; i<names.length; i++){
    var name = names[i];
    var freq = frequencies[i];
    var link = links[i];
    var text = descriptions[i];
    var geoText = geographies[i];
    var geo = geoText;
    geo = geo.replace("Block Group", "BlockGroup");
    geo = geo.replace("Economic Place", "Economic");
    geo = geo.replace("Metro Area", "Metro");
    geo = geo.replace("Census Tract", "Census");
    geo = geo.replace("Zip Code", "Zip");
    geo = geo.replace("Other", "OtherGeo");
    geo = geo.replace(/,/g, '');

    var $item = $("<div />", {
      "class": "card allfreq " + freq + " " + geo
    });
    $item.append("<h5 class='card-header'>" + freq + "</h5>" + 
    "<div class='card-body'><h5 class=" + "card-title" +">" + 
    name + "</h5><h6 class='card-subtitle mb-2 text-muted'>Geographies: " + 
    geoText + "</h6><p class=" + "card-text" + ">" + text + "</p>" + 
    "<a href=" + link + " class='btn btn-primary'>Explore</a>");
    $items = $items ? $items.add( $item ) : $item;
  }
  $items.appendTo( $("#grid"));
}

$("input[type='checkbox']").change(function(){
  if($(this).is(":checked")){
      $(this).parent().addClass("btn-secondary-active"); 
  }else{
      $(this).parent().removeClass("btn-secondary-active");  
  }
});