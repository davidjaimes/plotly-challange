// Create dropdown menu from individual IDs to index html file.
d3.json("./samples.json").then(data => {
  data.names.forEach(n => {
    d3.select("#selDataset")
    .append("option")
    .text(n)
    .property("value", n)
  });

  // Select data from samples.json file and return object with top ten
  // UTOs found in individual.
  function selectData(index) {
    // PARAMETERS
    // x: sample_values, y: otu_ids, l: otu_labels
    var ind = data.names.findIndex(d => d === index);
    var x = data.samples[ind].sample_values.slice(0, 10);
    var y = data.samples[ind].otu_ids.slice(0, 10);
    var l = data.samples[ind].otu_labels.slice(0, 10);
    return {
      x: x.reverse(),
      y: y.map(d => `OTU ${d}`).reverse(),
      l: l.reverse()};
  };

  // Display the default plot
  function defaultPlot() {
    var selection = selectData("940");
    var barData = [{
      x: selection.x,
      y: selection.y,
      type: "bar",
      orientation: "h",
      hovertext: selection.l
    }];
    Plotly.newPlot("bar", barData);
  };

  // On change to the DOM, call optionChanged()
  d3.selectAll("#selDataset").on("change", optionChanged);

  // Function called by DOM changes
  function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    var sel = selectData(dataset);

    Plotly.restyle("bar", "x", [sel.x]);
    Plotly.restyle("bar", "y", [sel.y]);

  }

  defaultPlot();
});
