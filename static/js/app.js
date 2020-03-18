// Save file name to variable
var fname = "./samples.json"

// Make function for read, and plot data.
function buildPlot() {
  d3.json(fname).then(function(data) {

    // Print to console, find desired data.
    var id = "968";
    var ind = data.names.findIndex(d => d === id);
    var values = data.samples[ind].sample_values;
    var otu_ids = data.samples[ind].otu_ids;
    var otu_labels = data.samples[ind].otu_labels;
    console.log(otu_ids)
  });
}

buildPlot();
