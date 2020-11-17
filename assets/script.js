var grid=$(".container");
var filter=$(".btn-group input");
var search=$(".quicksearch");
var qsRegex;
var buttonFilter;

var names = [
  "Annual Business Survey",
  "American Community Survey",
  "Annual Survey of Manufactures",
  "Business Dynamics Statistics",
  "Building Permits",
  "County Business Patterns",
  "Commodity Flow Survey",
  "Decennial Census",
  "e-Commerce Statistics",
  "Economic Census",
  "U.S. International Trade in Goods and Services",
  "Job-to-Job Flows",
  "LEHD Origin-Destination Employment Statistics",
  "Manufacturers' Shipments, Inventories, and Orders",
  "Monthly Retail Trade Survey",
  "Monthly Wholesale Trade Survey",
  "Nonemployer Statistics",
  "New Residential Construction",
  "New Residential Sales",
  "Quarterly Financial Report",
  "Quarterly Workforce Indicators"
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
  "National, State, Metro, County, Place",
  "National, State, Metro, County, Place, ZCTA, Tract, BlockGroup, OtherGeo",
  "National, State",
  "National, State, Metro",
  "National, State, Metro, County, Place, OtherGeo",
  "National, State, Metro, County, Zip, OtherGeo",
  "National, State, OtherGeo",
  "National, State, County, Place, ZCTA, Tract, BlockGroup, Block, OtherGeo",
  "National",
  "National, State, Metro, County, Economic, Place",
  "National, State, Metro, OtherGeo",
  "National, State, Metro",
  "National, State, Metro, County, Place, ZCTA, Tract, BlockGroup, Block, OtherGeo",
  "National",
  "National",
  "National",
  "National, State, Metro, County",
  "National, OtherGeo",
  "National, OtherGeo",
  "National",
  "National, State, Metro, County, OtherGeo",
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
  "The Building Permits Survey measures the number of new housing units authorized by building permits. Data are available monthly, year- to- date, and annually at the national, state, selected metropolitan area, county and place levels. The data are from the Building Permits Survey.",
  "Business Dynamics Statistics (BDS) provides annual measures of business dynamics (such as job creation and destruction, establishment births and deaths, and firm startups and shutdowns) for the economy and aggregated by establishment and firm characteristics.",
  "Commodity Flow Survey (CFS) data are used by policy makers and transportation planners in various federal, state, and local agencies for assessing the demand for transportation facilities and services, energy use, and safety risk and environmental concerns.",
  "County Business Patterns (CBP) is an annual series that provides subnational economic data by industry. This series includes the number of establishments, employment during the week of March 12, first quarter payroll, and annual payroll.",
  "The U.S. census counts each resident of the country, where they live on April 1, every ten years ending in zero. The Constitution mandates the enumeration to determine how to apportion the House of Representatives among the states.",
  "Measuring the Electronic Economy. E-commerce statistics on shipments, sales and revenues from key sectors of the economy: manufacturing, wholesale, services and retail. These statistics are available for the nation dating back to 1998.",
  "The Census Bureau's e-commerce report measures the value of goods and services sold online whether over open networks such as the Internet, or over proprietary networks running systems such as Electronic Data Interchange (EDI).",
  "The estimates in this report are based on data collected from separate surveys conducted by the Census Bureau: Economic Census–Manufacturing, Annual Survey of Manufactures, Annual Wholesale Trade Survey, Service Annual Survey, and the Annual Retail Trade Survey.",
  "Measures of total economic activity and e-commerce are presented in this report to provide a broad perspective of e-commerce activity across several sectors.",
  "The U.S. Census Bureau collects extensive statistics about businesses that are essential to understanding the American economy.  This official count, better known as the Economic Census, serves as the foundation for the measurement of U.S. businesses and their economic impact. Conducted every 5 years, nearly 4 million businesses, large, medium, and small, covering most industries and all geographic areas of the United States will receive surveys tailored to their primary business activity.",
  "Job-to-Job Flows (J2J) is a set of statistics on job mobility in the United States. J2J include statistics on: (1) the job-to-job transition rate, (2) hires and separations to and from employment, (3) earnings changes due to job change, and (4) characteristics of origin and destination jobs for job-to-job transitions. These statistics are available at the national, state, and metropolitan area levels and by worker and firm characteristics.",
  "To browse the J2J data files in their directory structure or to access them with a FTP program (must be able to access HTTP), go to: lehd.ces.census.gov/data/j2j/. J2J data can also be accessed via Job-to-Job Flows Explorer. This analysis and visualization tool allows for the construction of tables, maps, and charts to compare, aggregate and analyze flows by worker and firm characteristics.",
  "LEHD Origin-Destination Employment Statistics (LODES) used by the tool, OnTheMap, provide details about where workers are employed, where they live, and the relationships between the two.",
  "The Manufacturers’ Shipments, Inventories, and Orders (M3) survey provides broad-based, monthly statistical data on economic conditions in the domestic manufacturing sector. The survey measures current industrial activity and provides an indication of future business trends.",
  "The Monthly Retail Trade Survey (MARTS) provides current estimates of sales at retail and food services stores and inventories held by retail stores. The United States Code, Title 13, authorizes this survey and provides for voluntary responses.",
  "The Wholesale Trade sector comprises establishments engaged in wholesaling merchandise, generally without transformation, and rendering services incidental to the sale of merchandise. The merchandise described in this sector includes the outputs of agriculture, mining, manufacturing, and certain information industries, such as publishing.",
  "This survey provides national and regional data on the number of new housing units authorized by building permits; authorized, but not started; started; under construction; and completed. The data are for new, privately-owned housing units, excluding HUD-code manufactured (mobile) homes. The data are from the Building Permits Survey, and from the Survey of Construction (SOC), which is partially funded by the Department of Housing and Urban Development (HUD). Local building permit data may be found on the Building Permits Survey webpage.",
  "This survey provides national and regional data on the number of new single-family houses sold and for sale. It also provides national data on median and average prices, the number of houses sold and for sale by stage of construction, and other statistics. The data are from the Survey of Construction (SOC), which is partially funded by the Department of Housing and Urban Development (HUD).",
  "Nonemployer Statistics (NES) is an annual series that provides subnational economic data for businesses that have no paid employees and are subject to federal income tax. The data consist of the number of businesses and total receipts by industry. Most nonemployers are self-employed individuals operating unincorporated businesses (known as sole proprietorships), which may or may not be the owner's principal source of income.",
  "The majority of all business establishments in the United States are nonemployers, yet these firms average less than 4 percent of all sales and receipts nationally. Due to their small economic impact, these firms are excluded from most other Census Bureau business statistics (the primary exception being the Survey of Business Owners). The NES series is the primary resource available to study the scope and activities of nonemployers at a detailed geographic level. For complementary statistics on the firms that do have paid employees, refer to the County Business Patterns. Additional sources of data on small businesses include the Economic Census, and the Statistics of U.S. Businesses.",
  "Since 1947 The Quarterly Financial Report (QFR) program has collected and published quarterly aggregate statistics on the business financial conditions and position of U.S. corporations. The data released includes estimated statements of income and retained earnings, balance sheets, and related financial and operation ratios. Industries covered include mining, manufacturing, wholesale trade, retail trade, information services, professional and technical services (except legal services)",
  "The Quarterly Workforce Indicators (QWI) provide local labor market statistics by industry, worker demographics, employer age and size. Unlike statistics tabulated from firm or person-level data, the QWI source data are unique job-level data that link workers to their employers. Because of this link, labor market data in the QWI is available by worker age, sex, educational attainment, and race/ethnicity. This allows for analysis by demographics of a particular local labor market or industry – for instance, identifying industries with aging workforces. Links between workers and firms also allow the QWI to identify worker flows – hires, separations, and turnover – as well as net employment growth. As most hiring activity is the consequence of worker turnover rather than employment growth, a focus on employment growth alone may misrepresent employment opportunity in the local labor market. Wages by industry and demographics as well as by whether the worker was newly hired are also available. QWI wages for new hires can be compared to wages for continuing workers, and wage growth for similar workers across industries can be compared to identify important local labor market trends.",
  "The source data for the QWI is the Longitudinal Employer-Household Dynamics (LEHD) linked employer-employee microdata. The LEHD data is massive longitudinal database covering over 95% of U.S. private sector jobs. Much of this data is collected via a unique federal-state data sharing collaboration, the Local Employment Dynamics (LED) partnership. LED is a cooperative venture between the LEHD program at the U.S. Census Bureau and state agencies of all 50 states, the District of Columbia, Puerto Rico, and the U.S. Virgin Islands2. Partner states voluntarily submit quarterly data files from existing administrative record systems, which are combined with a range of other data sources to generate public use products, including QWI and LODES (LEHD Origin-Destination Employment Statistics, presented in OnTheMap) and other new products in development. By integrating data used to administer public programs with existing census and surveys, a new national jobs database is generated at very low cost and with no additional respondent burden.",
  "U.S. International Trade in Goods and Services provides summary statistics for goods on a census, balance of payment basis, and services data each month. This includes data for the most recent month and year on goods by various commodity classifications, and by country of destination. Annual revisions are released in June of the following year."
]

createItems();

// filter items 
grid.isotope({
  itemSelector: ".card",
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

// create items
function createItems() {
  var button = "button";
  var cardPadding = "cardPadding";

  var $items;

  for (var i=0; i<names.length; i++){
    var name = names[i];
    var freq = frequencies[i];
    var link = links[i];
    var geo = geographies[i].replace(/,/g, '');
    var geoList = geographies[i];
    var $item = $("<div />", {
      "class": "card " + freq + " " + geo
    });
    $item.append("<div class=" + "flip-card" + "><div class=" + "flip-card-inner" + "><div class=" + 
    "flip-card-front" + "><h1>" + name + "</h1>" +
      '<h2>Frequency</h2>' + '<p>'+ freq + '</p>' + '<h2>Geographies</h2>' + '<p>' + geoList + '</p></div>' + 
      "<div class=" + "flip-card-back" + "><h2>Description</h2>" + "<p>" + descriptions[i] + "</p></div></div></div>");
    $items = $items ? $items.add( $item ) : $item;
  }
  $items.appendTo( $("#container") );
}


var card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});
