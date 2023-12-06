const container = document.getElementById("container");
const addGroupBtn = document.querySelectorAll(".add-group-btn");
const addInfoBtn = document.querySelectorAll(".add-info-btn");
function addGroup(event) {
  const groupItem = document.createElement("div");
  groupItem.classList.add("group-item");
  groupItem.innerHTML = `
    <h4 ondblclick="editText(event)">Group Item_20205135</h4>
    <button class="delete-btn" onclick="handleDelete(event)">
      <i class="fa-solid fa-trash-can"></i>
    </button>
    <button class="add-group-btn" onclick="addGroup(event)">< Add Group Item ></button>
    <button class="add-info-btn" onclick="addInfo(event)">< Add Info Item ></button>
    <ul></ul>
    `;
  const currentGroupItem = event.target.parentNode;
  currentGroupItem.insertAdjacentElement("afterend", groupItem);
}

function addInfo(event) {
  const infoItem = document.createElement("li");
  infoItem.innerHTML = `
    <label ondblclick="editText(event)">Info Item Name_20205135</label>
    <select class="select-tag" onchange="showInput(event)">
      <option value="">Chọn kiểu mục thông tin</option>
      <option value="text">Text</option>
      <option value="list">List</option>
      <option value="radio">Radio</option>
    </select>
    <button class="delete-btn" onclick="handleDelete(event)"><i class="fa-solid fa-trash-can"></i></button>
  `;
  const infoList = event.target.parentNode.lastElementChild;
  infoList.appendChild(infoItem);
}

function editText(event) {
  const text = event.target;
  // console.log(text.nodeName);
  text.style.display = "none";
  const input = document.createElement("input");
  input.type = "text";
  input.value = text.innerText;
  input.classList.add("edit-field");
  if (text.nodeName === "H4") {
    input.style.marginLeft = "12px";
    input.style.minWidth = "240px";
    input.style.height = "16px";
  }

  text.parentNode.insertBefore(input, text.nextSibling);
  input.focus();
  input.onkeyup = (event) => {
    if (event.key === "Enter") {
      text.innerText = input.value;
      text.style.display = "inline-block";
      input.style.display = "none";
    }
  };
}

function editTextInfoField(event) {
  const textInfoField = event.target;
  textInfoField.removeAttribute("readonly");
  textInfoField.focus();
  textInfoField.onkeyup = (event) => {
    if (event.key === "Enter") {
      textInfoField.setAttribute("readonly", true);
    }
  };
}

function editSelectInfoField(event) {
  console.log(event.target);
}

function handleDelete(event) {
  if (
    confirm(
      "Thông báo tới: Nguyễn Ngọc Tú - 20205135\nBạn có chắc chắn muốn xóa mục này?"
    )
  )
    event.target.parentNode.parentNode.remove();
}

function showInput(event) {
  var inputType = event.target;
  if (inputType.value === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("edit-field");
    input.ondblclick = editTextInfoField;
    input.setAttribute("readonly", "true");
    inputType.parentNode.insertBefore(input, inputType.nextSibling);
    inputType.style.display = "none";
  } else if (inputType.value === "list") {
    select = document.createElement("select");
    select.innerHTML = `
    <option value="">Chọn giá trị dưới đây</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    `;
    select.classList.add("select-tag");
    select.onchange = editSelectInfoField;
    inputType.parentNode.insertBefore(select, inputType.nextSibling);
    inputType.style.display = "none";
  } else if (inputType.value === "radio") {
    var options = ["Nam", "Nữ"];
    const div = document.createElement("div");
    for (var i = 0; i < options.length; i++) {
      const label = document.createElement("label");
      label.innerText = options[i];
      label.style.marginRight = "24px";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "radioOption";
      input.value = options[i];
      input.style.marginRight = "4px";
      div.appendChild(input);
      div.appendChild(label);
      inputType.parentNode.insertBefore(div, inputType.nextSibling);
      inputType.style.display = "none";
    }
  }
}

// Export HTML to PDF using jquery
$("body").on("click", "#export-btn", function () {
  html2canvas($("#main")[0], {
    onrendered: function (canvas) {
      var data = canvas.toDataURL();
      var docDefinition = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake
        .createPdf(docDefinition)
        .download("Thông tin sinh viên 20205135.pdf");
    },
  });
});
