class Cell {
  constructor(isHeader, disabled, data, column, row, active) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.column = column;
    this.row = row;
    this.active = active;
  }
}

const spreadsheet = [];
const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const spreadsheet_container = document.querySelector(".spreadsheet_container");
const export_btn = document.getElementById("export_btn");

export_btn.onclick = function (e) {
  let csv = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    console.log();
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }

  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);
  console.log("csv", csvUrl);

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "Exported Spreadsheet.csv";
  a.click();
};

init_spreadSheet();

function init_spreadSheet() {
  for (let i = 0; i < 10; i++) {
    let row_container = [];
    for (let j = 0; j < 10; j++) {
      const data = "";
      const cell = new Cell(false, false, data, i, j, false);
      if (i == 0) {
        cell.isHeader = true;
        cell.disabled = true;
        cell.data = alphabets[j - 1];
      } else if (j == 0) {
        cell.isHeader = true;
        cell.disabled = true;
        cell.data = i;
      } else {
        cell.isHeader = false;
        cell.disabled = false;
      }

      if (cell.data == undefined) {
        cell.data = "";
      }

      row_container.push(cell);
    }
    spreadsheet.push(row_container);
  }
  draw_spreadSheet();
}

function draw_spreadSheet() {
  for (let i = 0; i < 10; i++) {
    const row_block = document.createElement("div");
    row_block.className = "row_block";
    for (let j = 0; j < 10; j++) {
      const cell = spreadsheet[i][j];
      row_block.append(create_cellElement(cell));
    }
    spreadsheet_container.append(row_block);
  }
}

function create_cellElement(cell) {
  const cell_element = document.createElement("input");
  cell_element.className = "cell";
  cell_element.value = cell.data;
  cell_element.id = "cell_" + cell.column + cell.row;
  cell_element.isHeader = cell.isHeader;
  cell_element.disabled = cell.disabled;

  if (cell_element.isHeader) {
    cell_element.classList.add("header");
  }

  cell_element.onclick = () => handle_cellClick(cell);
  cell_element.onchange = (e) => handle_valueChange(e.target.value, cell);

  return cell_element;
}

function handle_cellClick(cell) {
  reset_active();
  const row_headerElement = get_RowsColumns_Element(0, cell.row);
  const column_headerElement = get_RowsColumns_Element(cell.column, 0);
  const status = document.getElementById("cell_status");
  row_headerElement.classList.add("active");
  column_headerElement.classList.add("active");
  status.innerHTML = `${row_headerElement.value}${column_headerElement.value}`;
}

function get_RowsColumns_Element(column, row) {
  return document.getElementById("cell_" + column + row);
}

function reset_active() {
  while (document.querySelector(".active")) {
    document.querySelector(".active").classList.remove("active");
  }
}

function handle_valueChange(value, cell) {
  cell.data = value;
}

console.log(spreadsheet);
