const spreadsheet_container = document.querySelector("#spreadsheet_container");
const export_btn = document.querySelector("#export_btn");
const rows = 10;
const columns = 10;
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

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    row_name,
    column_name,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.row_name = row_name;
    this.column_name = column_name;
    this.active = active;
  }
}

export_btn.onclick = function (e) {
  let csv = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }
  const csv_object = new Blob([csv]);
  const csv_url = URL.createObjectURL(csv_object);
  console.log(csv, csv_url);

  const a = document.createElement("a");
  a.href = csv_url;
  a.download = "Exported Spreadsheet.csv";
  a.click();
};

init_spreadsheet();

// 10개의 행렬로 이루어진 스프레드 시트 생성 - status, data logic
function init_spreadsheet() {
  for (let i = 0; i < rows; i++) {
    let spreadsheet_row = [];
    for (let j = 0; j < rows; j++) {
      let cell_data = "";
      let isHeader = false;
      let isDisabled = false;
      if (i === 0) {
        isHeader = true;
        isDisabled = true;
        cell_data = alphabets[j - 1];
      }

      if (j === 0) {
        cell_data = i;
        isHeader = true;
        isDisabled = true;
      }

      if (!cell_data) {
        cell_data = "";
      }

      const row_name = i;
      const column_name = alphabets[j - 1];
      const cell = new Cell(
        isHeader,
        isDisabled,
        cell_data,
        i,
        j,
        row_name,
        column_name,
        false
      );
      spreadsheet_row.push(cell);
    }
    spreadsheet.push(spreadsheet_row);
    console.log(spreadsheet);
  }

  draw_sheet();
}

function draw_sheet() {
  spreadsheet_container.innerHTML = "";
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainer_element = document.createElement("div");
    rowContainer_element.className = "cell_row";
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainer_element.append(create_cellElement(cell));
    }
    spreadsheet_container.append(rowContainer_element);
  }
}

function create_cellElement(cell) {
  const cell_element = document.createElement("input");
  cell_element.className = "cell";
  cell_element.id = "cell_" + cell.row + cell.column;
  cell_element.value = cell.data;
  cell_element.disabled = cell.disabled;

  if (cell.isHeader) {
    cell_element.classList.add("header");
  }
  cell_element.onclick = () => handle_cellClick(cell);
  cell_element.onchange = (e) => handle_onChange(e.target.value, cell);
  return cell_element;
}

function handle_cellClick(cell) {
  clearHeader_states();
  const column_header = spreadsheet[0][cell.column];
  const row_header = spreadsheet[cell.row][0];
  const column_headerElement = getElement_fromRowColumn(
    column_header.row,
    column_header.column
  );
  const row_headerElement = getElement_fromRowColumn(
    row_header.row,
    row_header.column
  );
  column_headerElement.classList.add("active");
  row_headerElement.classList.add("active");

  document.querySelector("#cell_status").innerHTML =
    cell.column_name + "" + cell.row_name;
}

function handle_onChange(data, cell) {
  cell.data = data;
}

function clearHeader_states() {
  for (let i = 0; i < spreadsheet.length; i++) {
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      if (cell.isHeader) {
        let cell_element = getElement_fromRowColumn(cell.row, cell.column);
        cell_element.classList.remove("active");
      }
    }
  }
}

function getElement_fromRowColumn(row, col) {
  return document.querySelector("#cell_" + row + col);
}
