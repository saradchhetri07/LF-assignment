export default class Box {
  //* constructor for Box
  constructor(id) {
    this.element = document.createElement("div"); // Create a new div element
    this.element.id = id; // Set the id of the div element
    this.element.style.border = "2px solid #999"; // Add a border to the div
    this.element.style.height = "80vh"; // Set the height of the div to 90% of the viewport height
    this.element.style.width = "90vw"; // Set the width of the div to 90% of the viewport width
    this.element.style.overflow = "hidden";
    this.element.style.position = "relative"; // Set the position of the div to relative
    this.element.style.marginTop = "20px"; // Position the div 10% from the top of its containing element
    this.element.style.background = "#fff"; // Set the background color of the div to white
    document.body.appendChild(this.element); // Append the div element to the body of the document
  }

  getDimensions() {
    return {
      width: this.element.clientWidth, // Get the width of the box
      height: this.element.clientHeight, // Get the height of the box
    };
  }
}
