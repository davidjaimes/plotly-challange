// Save file name to variable
var fname = "./samples.json"

// Create dropdown menu from individual IDs.
d3.json(fname).then(function(data) {
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

    // Print to console, find desired data.
    var id = "968";
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

// Make function for read, and plot data.
function buildPlot() {
  d3.json(fname).then(function(data) {

    // Print to console, find desired data.
    var id = "968";
    var ind = data.names.findIndex(d => d === id);
    var values = data.samples[ind].sample_values.slice(0, 10);
    var otu_ids = data.samples[ind].otu_ids.slice(0, 10);
    var otu_labels = data.samples[ind].otu_labels.slice(0, 10);
    console.log(otu_ids)
  });
}

defaultPlot();
