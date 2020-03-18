// Save file name to variable
var fname = "./samples.json"

// Create dropdown menu from individual IDs.
var data = d3.json(fname).then(function(data) {
  var names = data.names
  names.forEach(n => {
    d3.select("#selDataset")
    .append("option")
    .text(n)
    .property("value", n)
  });
});

// Display the default plot
function defaultPlot(data) {

  d3.json(fname).then(function(data) {

    var id = "940";
    var ind = data.names.findIndex(d => d === id);
    var values = data.samples[ind].sample_values.slice(0, 10);
    var otu_ids = data.samples[ind].otu_ids.slice(0, 10);
    var otu_labels = data.samples[ind].otu_labels.slice(0, 10);

    var data = [{
      x: values.reverse(),
      y: otu_ids.map(d => `OTU ${d}`).reverse(),
      type: "bar",
      orientation: "h"
    }];

    Plotly.newPlot("bar", data);
  });
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  d3.json(fname).then(function(data) {
    var ind = data.names.findIndex(d => d === dataset);
    var x = data.samples[ind].sample_values.slice(0, 10);
    var y = otu_ids = data.samples[ind].otu_ids.slice(0, 10);

    Plotly.restyle("bar", "x", [x.reverse()]);
    Plotly.restyle("bar", "y", [y.map(d => `OTU ${d}`).reverse()]);
    });
}

defaultPlot();
