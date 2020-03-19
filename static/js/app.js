d3.json("./samples.json").then(data => {

  // Create dropdown menu from individual IDs to index html file.
  data.names.forEach(n => {
    d3.select("#selDataset")
    .append("option")
    .text(n)
    .property("value", n)
  });

  // Fill metadate in Demographic info area.
  function fillMeta(index) {
    var selection = d3.select("#sample-metadata");
    selection.html("");
    var ind = data.names.findIndex(d => d === index);
    Object.entries(data.metadata[ind]).forEach(([key, value]) => {
      selection.append("h6").text(`${key}: ${value}`);
    });
  };

  // Select data from samples.json file and return object with top ten
  // UTOs found in individual.
  function selectData(index) {
    // PARAMETERS
    // x: sample_values, y: otu_ids(int), yl: otu_ids(labels), l: otu_labels
    var ind = data.names.findIndex(d => d === index);
    var x = data.samples[ind].sample_values.slice(0, 10);
    var y = data.samples[ind].otu_ids.slice(0, 10);
    var l = data.samples[ind].otu_labels.slice(0, 10);
    return {
      x: x.reverse(),
      y: y.reverse(),
      yl: y.map(d => `OTU ${d}`),
      l: l.reverse()};
  };

  // Display the default plot
  function defaultPlot() {
    // Default value is "940" for selection, first in array.
    var selection = selectData(data.names[0]);

    // Gather data for bar plot.
    var barData = [{
      x: selection.x,
      y: selection.yl,
      type: "bar",
      orientation: "h",
      hovertext: selection.l
    }];

    // Gather data for bubble chart.
    var bubbleData = [{
      x: selection.y,
      y: selection.x,
      marker: {size: selection.x, color: selection.y, colorscale: "Earth"},
      mode: "markers",
      text: selection.l
    }];

    Plotly.newPlot("bar", barData);
    Plotly.newPlot("bubble", bubbleData);
    fillMeta(data.names[0]);
  };

  // On change to the DOM, call optionChanged()
  d3.selectAll("#selDataset").on("change", optionChanged);

  // Function called by DOM changes
  function optionChanged() {

    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    var sel = selectData(dataset);

    Plotly.restyle("bar", "x", [sel.x]);
    Plotly.restyle("bar", "y", [sel.yl]);
    Plotly.restyle("bar", "hovertext", [sel.l]);
    Plotly.restyle("bubble", "x", [sel.y]);
    Plotly.restyle("bubble", "y", [sel.x]);
    Plotly.restyle("bubble", "text", [sel.l]);
    Plotly.restyle("bubble", "marker", [{size: sel.x, color: sel.y, colorscale: "Earth"}]);
    fillMeta(dataset);
  };

  defaultPlot();
  
}).catch(function(error) {
  console.log(error);
});
