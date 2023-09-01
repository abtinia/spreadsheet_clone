const spreadsheet_container = document.querySelector("#spreadsheet_container");

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
  constructor(isHeader, disabled, data, row, column, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
  }
}

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
      const cell = new Cell(isHeader, isDisabled, cell_data, i, j, false);
      spreadsheet_row.push(cell);
    }
    spreadsheet.push(spreadsheet_row);
  }

  console.log("spreadsheet", spreadsheet.length, spreadsheet);
  draw_sheet();
}

function draw_sheet() {
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
  cell_element.id = "cell_" + cell.column + cell.row;
  cell_element.value = cell.data;
  cell_element.disabled = cell.disabled;
  return cell_element;
}
